// src/pages/TestError.tsx
import React, { useState } from "react";

const TestError: React.FC = () => {
    const [explode, setExplode] = useState(false);

    if (explode) {
        // ❌ این خطا در مرحلهٔ رندر پرتاب می‌شود
        throw new Error("💥 Fake render error triggered!");
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Everything is fine ✅ until you click the button</h2>
            <button onClick={() => setExplode(true)}>Trigger Render Error</button>
        </div>
    );
};

export default TestError;
