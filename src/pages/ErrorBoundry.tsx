import React from "react";

export type ErrorBoundaryProps = {
    /**
     * Optional render prop to fully customize fallback UI.
     * If provided, it receives { error, resetError }.
     */
    fallbackRender?: (props: {
        error: Error | null;
        resetError: () => void;
    }) => React.ReactElement | null;

    /**
     * Called when an error is caught. Good place to call Sentry.captureException or send to backend.
     */
    onError?: (error: Error, info: React.ErrorInfo) => void;

    /**
     * Keys that when changed will reset the boundary automatically.
     * Useful when parent props/state changes should clear the error.
     */
    resetKeys?: Array<unknown>;

    /**
     * Optional children
     */
    children: React.ReactNode;
};

type ErrorBoundaryState = {
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
};

export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render shows the fallback UI.
        return { error, errorInfo: null };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Save details in state and call onError if provided.
        this.setState({ error, errorInfo: info });
        if (this.props.onError) {
            try {
                this.props.onError(error, info);
            } catch (e) {
                // swallow errors from onError to avoid infinite loops
                // (but you might log to console)
                // eslint-disable-next-line no-console
                console.error("onError callback threw:", e);
            }
        } else {
            // default: log to console
            // eslint-disable-next-line no-console
            console.error("Uncaught error in ErrorBoundary:", error, info);
        }
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        // If resetKeys changed, reset the error boundary
        const { resetKeys } = this.props;
        if (
            resetKeys &&
            prevProps.resetKeys &&
            !areArraysEqual(resetKeys, prevProps.resetKeys)
        ) {
            this.resetError();
        }
    }

    resetError = () => {
        this.setState({ error: null, errorInfo: null });
    };

    renderFallback() {
        const { fallbackRender } = this.props;
        const { error } = this.state;

        if (fallbackRender) {
            return fallbackRender({ error, resetError: this.resetError });
        }

        // Default fallback UI
        return (
            <div
                role="alert"
                style={{
                    padding: 24,
                    borderRadius: 8,
                    background: "#fff6f6",
                    border: "1px solid #ffd6d6",
                    color: "#611a15",
                    maxWidth: 900,
                    margin: "36px auto",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                }}
            >
                <h2 className="m-0 mb-2" >
                    Something went wrong.
                </h2>
                <p className="mt-0 mb-3">
                    Unfortunately, an error occurred on the page. You can refresh the page or try again.
                </p>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                        onClick={() => window.location.reload()}
                        style={buttonStyle}
                        type="button"
                    >
                        Refresh page
                    </button>

                    <button onClick={this.resetError} style={secondaryButtonStyle} type="button">
                        Retry
                    </button>

                    <button
                        onClick={() => this.reportError()}
                        style={reportButtonStyle}
                        type="button"
                    >
                        Error report
                    </button>
                </div>

                {error && (
                    <details style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
                        <summary>
                            Show details (for developers)
                        </summary>
                        <div style={{ marginTop: 8 }}>{error.message}</div>
                        {this.state.errorInfo && (
                            <pre style={{ fontSize: 12 }}>{this.state.errorInfo.componentStack}</pre>
                        )}
                    </details>
                )}
            </div>
        );
    }

    reportError() {
        const { error } = this.state;
        // If the host app provided onError, we already called it in componentDidCatch,
        // but we allow a manual report here too.
        if (error) {
            if (this.props.onError) {
                try {
                    this.props.onError(error, this.state.errorInfo ?? ({} as React.ErrorInfo));
                    // optionally show a toast / confirmation
                    // eslint-disable-next-line no-alert
                    alert("Error sent. Thank you for your cooperation.");
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error("Error when reporting:", e);
                    // eslint-disable-next-line no-alert
                    alert("Sending the report was unsuccessful.");
                }
            } else {
                // fallback reporting: send to an endpoint (example)
                try {
                    void fetch("/api/log-client-error", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            message: error.message,
                            stack: this.state.errorInfo?.componentStack,
                            url: window.location.href,
                            userAgent: navigator.userAgent,
                        }),
                    });
                    // eslint-disable-next-line no-alert
                    alert("Error sent (local).");
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error("Local report failed:", e);
                    // eslint-disable-next-line no-alert
                    alert("Sending the report was unsuccessful.");
                }
            }
        }
    }

    render() {
        if (this.state.error) {
            return this.renderFallback();
        }

        return this.props.children as React.ReactElement;
    }
}

/* Helper styles and functions */
const buttonStyle: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#111827",
    color: "white",
    cursor: "pointer",
};

const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "transparent",
    color: "#111827",
};

const reportButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#b91c1c",
    borderColor: "#991b1b",
};

function areArraysEqual(a: Array<unknown>, b: Array<unknown>) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export default ErrorBoundary;
