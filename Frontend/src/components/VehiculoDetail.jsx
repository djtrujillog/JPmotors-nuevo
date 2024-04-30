import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataView } from 'primereact/dataview';

import clienteAxios from '../config/clienteAxios';

const VehiculoDetail = ({ vehiculoDialog, setVehiculoDialog, vehiculoRecord }) => {
    const [vehiculoDetail, setVehiculoDetail] = useState([]);

    useEffect(() => {
        const getVehiculoDetail = async () => {
            if( vehiculoRecord && vehiculoRecord.id ) {
                const token = localStorage.getItem('token');
                if( !token ) {
                    return;
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const response = await clienteAxios.get(`/vendedor/id/${vehiculoRecord.Id}`, config);
                const { data } = response;
                if (data) {
                    setVehiculoDetail(data);
                }
            }
        }
        getVehiculoDetail();    
    }, [ vehiculoRecord ]);

    //Ocultar diálogo
    const hideDialog = () => {
        setVehiculoDialog(false);
    };
    
  return (
        <Dialog
            visible={vehiculoDialog}
            style={{ width: '600px', textAlign: 'center'}}
            header={`Detalle del vehículo ${vehiculoRecord.Marca}, modelo ${vehiculoRecord.Modelo}`}
            modal className="p-fluid"
            onHide={hideDialog}
        >
            <div className='mt-2'>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_Modelo" className="font-bold">Modelo:</label>
                    <InputText id="txt_Modelo" value={vehiculoRecord.Modelo} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_marca" className="font-bold">Marca:</label>
                    <InputText id="txt_marca" value={vehiculoRecord.Marca} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_anio" className="font-bold">Año:</label>
                    <InputText id="txt_anio" value={vehiculoRecord.Anio} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_precioGerente" className="font-bold">Precio Gerente:</label>
                    <InputText id="txt_precioGerente" value={`Q ${vehiculoRecord.PrecioGerente}`} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_precioWeb" className="font-bold">Precio Web:</label>
                    <InputText id="txt_precioWeb" value={`Q ${vehiculoRecord.PresioWeb}`} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_PrecioLista" className="font-bold">Precio Lista:</label>
                    <InputText id="txt_PrecioLista" value={`Q ${vehiculoRecord.PrecioLista}`} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_Imagen" className="font-bold">Imágen:</label>
                    <InputText id="txt_Imagen" value={vehiculoRecord.Imagen} required className='w-4' />
                </div>
                <div className='flex justify-between items-center m-2'>
                    <label htmlFor="lbl_condicion" className="font-bold">Condición:</label>
                    <InputText id="txt_condicion" value={vehiculoRecord.Condicion == 'N' ? 'Nuevo' : 'Usado'} required className='w-4' />
                </div>
            </div>
        </Dialog>
  )
}

export default VehiculoDetail