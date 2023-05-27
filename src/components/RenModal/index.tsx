import React, { FC, useState, useImperativeHandle } from 'react';
import { Button, Modal } from 'antd';

const RenModal: FC = (props: any, ref: any) => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
    }));

    const handleOk = () => {
        props.handleOk && props.handleOk();
    };

    const handleCancel = () => {
        setOpen(false);
        props.handleCancel && props.handleCancel();
    };

    return (
        <>
            <Modal
                open={open}
                title={props.title}
                onOk={handleOk}
                onCancel={handleCancel}
                width={props.width || 800}
                okText="确定"
                cancelText="取消"
                footer={props.footer}

                // [
                //     <Button key="back" onClick={handleCancel}>
                //         Return
                //     </Button>,
                //     <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                //         Submit
                //     </Button>,
                //     <Button key="link" href="https://google.com" type="primary" loading={loading} onClick={handleOk}>
                //         Search on Google
                //     </Button>,
                // ]
            >
                {props.children}
            </Modal>
        </>
    );
};

export default React.forwardRef(RenModal as any) as any;
