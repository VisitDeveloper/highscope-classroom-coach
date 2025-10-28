import { Modal, theme } from 'antd'
import React, { type Dispatch, type SetStateAction } from 'react'
interface ModalCommon {
    children?: React.ReactElement | React.ReactNode;
    openModal: boolean;
    setOpenModal?: Dispatch<SetStateAction<boolean>>;
    onClose: () => void;
    titleModal: string | React.ReactElement;
}


export default function ModalCommon(props: ModalCommon) {
    const { token: { colorBorder, colorText } } = theme.useToken();

    return (
        <>
            <Modal
                title={props.titleModal}
                className="my-modal" style={{ ['--modal-border' as any]: colorBorder }}
                centered
                styles={{
                    header: {
                        borderBottom: `1px solid ${colorText}`,
                        marginBottom: 20,
                        paddingBottom: 10,

                    },
                }}
                open={props.openModal}
                onCancel={props.onClose}
                footer={(_) => (
                    <></>
                )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '60%',
                    xxl: '50%',
                }}
                {...props}
            >
                {props.children}
            </Modal>
        </>
    )
}
