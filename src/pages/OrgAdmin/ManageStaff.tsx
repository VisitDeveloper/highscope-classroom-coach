import { Button } from 'antd'
import GenericTable from './components/generic-table'
import { PlusOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { ManageSiteService } from './../../services/manage-sites';
import ModalCommon from './../../components/ui/modal';
import ModalCreateClassRoomForm from './Modal/ModalCreateClassRoom';

const postServiceEntity = new ManageSiteService();

function ManageStaff() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <div>
            <GenericTable
                title="Manage Staff"
                service={postServiceEntity}
                elementsTitle={
                    <Button type="primary" size="large" onClick={() => setOpenModal(true)}>
                        <PlusOutlined /> Add Staff
                    </Button>
                }
                additionalColumns={[]}
                keyColumn={'id'}
                initialPageSize={10}
            />

            {openModal && (
                <ModalCommon
                    titleModal="Create Item"
                    openModal={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <ModalCreateClassRoomForm />
                </ModalCommon>
            )}
        </div>
    )
}
export default ManageStaff