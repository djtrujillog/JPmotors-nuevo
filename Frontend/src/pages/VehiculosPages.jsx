import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
        

// import vehiculoDetail from '../Images/nuevos/';

import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import VehiculoDetail from '../components/VehiculoDetail';

const VehiculosPages = () => {

  const toast = useRef(null);
  const navigate = useNavigate();

  const [vehiculo, setVehiculo] = useState({
    Id: 0,
    Marca: '',
    Modelo: '',
    Anio: '',
    PrecioGerente: '',
    PresioWeb: '',
    PrecioLista: '',    
    Imagen: '',
    MarcaId: 0,
    Condicion: ''
  });
  const [globalvehiculoFilterValue, setGlobalvehiculoFilterValue] = useState('');   
  const [vehiculoFilters, setVehiculoFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoRecord, setVehiculoRecord] = useState(null);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [vehiculoDialog, setVehiculoDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [update, setUpdate] = useState(0);

  //Cargar datos iniciales
  useEffect(() => {
    const verificarAcceso = () => {
      const auth = JSON.parse(localStorage.getItem('auth') || {});
      // if (!auth.esAdmin) navigate('/dashboard');
    }

    //Obtener vehículos
    const getVehiculos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
        };

        const resp = await clienteAxios.get('/vehiculos', config);
        if(!resp) {
          throw new Error('Error al cargar los vehículos');
        }        
        setVehiculos(resp.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    verificarAcceso();
    getVehiculos();
  }, [ activeIndex, update ]);

  // Mostrar una alerta flotante
  const showFloatingAlert = (tipo, mensaje) => {
    if (toast.current) {
        toast.current.show({ severity: tipo, summary: 'Información', detail: mensaje });
    } else {
        console.error('La referencia a toast no está inicializada.');
    }
  };

  //Manejar los cambios en los campos del vehiculo
  const handlevehiculoChange = (e) => {
    setVehiculo({
      ...vehiculo,
      [e.target.name]: e.target.value
    });
  }

  //validar que el vehiculo tenga todos los campos
  const checkvehiculo = () => {
    if (!vehiculo.Modelo || !vehiculo.Marca || !vehiculo.Anio || !vehiculo.PrecioGerente || !vehiculo.PresioWeb || !vehiculo.PrecioLista || !vehiculo.Imagen || !vehiculo.MarcaId || !vehiculo.Condicion) {
      showFloatingAlert('error', 'Todos los campos son obligatorios');
      return;
    }
    savevehiculo();
  }

  //Guardar un vehiculo
  const savevehiculo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          return;
      }

      const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }

      const dataVehiculo = {
          Id: vehiculo.Id,
          Modelo: vehiculo.Modelo,
          Marca: vehiculo.Marca,
          Anio: vehiculo.Anio,
          PrecioGerente: vehiculo.PrecioGerente,
          PresioWeb: vehiculo.PresioWeb,
          PrecioLista: vehiculo.PrecioLista,
          Imagen: vehiculo.Imagen,
          MarcaId: vehiculo.MarcaId,
          Condicion: vehiculo.Condicion
      }

      let resp;
      if (vehiculo.Id) {
          resp = await clienteAxios.put(`/vehiculos/${vehiculo.Id}`, dataVehiculo, config);
      } else {
          resp = await clienteAxios.post('/vehiculos', dataVehiculo, config);
      }

      if( !resp || resp.status >= 400) {
          showFloatingAlert('danger', 'El vehiculo no se pudo guardar o actualizar');
          throw new Error('Error al guardar el vehiculo');
      } else if (vehiculo.Id) {
          showFloatingAlert('success', 'Vehiculo actualizado correctamente');
      } else {
          showFloatingAlert('success', 'Vehiculo guardado correctamente');
      }
      resetState();
      setActiveIndex(1); 
    } catch (error) {
      console.log('Hubo un error al guardar el vehiculo', error);
    }
  }

  const onGlobalvehiculoFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...vehiculoFilters };

    _filters['global'].value = value;

    setVehiculoFilters(_filters);
    setGlobalvehiculoFilterValue(value);
  }

  // Plantilla de cuerpo para la columna de verificación
  const verifiedBodyTemplate = (rowData) => {
    return <i className={classNames('pi', { 'text-blue-500 pi-stop': rowData.Anulado, 'text-blue-500 pi-check-square': !rowData.Anulado })}></i>;
  };

  // Plantilla de acciones en la tabla de vehiculos
  const actionBodyTemplate = (rowData) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
                icon="pi pi-eye"
                onClick={() => viewVehiculoDetail(rowData)}
                style={{ padding: '0.3rem', fontSize: '0.75rem', backgroundColor: '#48BB78', color: '#FFFFFF' }}
            />
            <Button
                icon="pi pi-pencil"
                onClick={() => editVehiculo(rowData)}
                style={{ padding: '0.3rem', fontSize: '0.75rem', backgroundColor: '#4299E1', color: '#FFFFFF' }}
                className='ml-1'
            />
            <Button
                icon="pi pi-trash"
                onClick={() => handleDeleteVehiculoClick(rowData)}
                style={{ padding: '0.3rem', fontSize: '0.75rem', backgroundColor: '#F56565', color: '#FFFFFF' }}
                className='ml-1'
            />
        </div>
    );
  };

  const viewVehiculoDetail = (vehiculo) => {
    setVehiculoDialog(true);
    setVehiculoRecord(vehiculo);
  }

  const editVehiculo = (vehiculo) => {
    if( vehiculo ) {
      setVehiculo(vehiculo);
      setActiveIndex(0);
    }
  }

  // Eliminar un vehiculo
  const handleDeleteVehiculoClick = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    setShowDeleteDialog(true);
  }

  // Limpiar los estados, una vez guardado el vehiculo
  const resetState = () => {
    setVehiculo({
      Id: 0,
      Marca: '',
      Modelo: '',
      Anio: '',
      PrecioGerente: '',
      PresioWeb: '',
      PrecioLista: '',    
      Imagen: '',
      MarcaId: 0,
      Condicion: ''
    });    
  }

  //Confirmar ocultar vehiculo
  const handleConfirmDelete = () => {
    hideVehiculo(selectedVehiculo);
    setShowDeleteDialog(false);
    setUpdate(update + 1);
  };

  //Ocultar vehiculo
  const hideVehiculo = async (vehiculo) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
      }

      const resp = await clienteAxios.delete(`/vehiculos/${vehiculo.Id}`, config);

      if( !resp || resp.status >= 400) {
          showFloatingAlert('danger', 'El vehiculo no se pudo eliminar');
          throw new Error('Error al eliminar el vehiculo');
      } else {
          showFloatingAlert('success', 'Vehiculo eliminado correctamente');
      }

      //Actualizar TabPanel
      setActiveIndex(1);
    } catch (error) {
      console.log('Hubo un error al eliminar el vehiculo', error);
    }
  }

  const renderFooter = (name) => {
    return (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} className="p-button-text mr-2" />
            <Button label="Si" icon="pi pi-check" onClick={handleConfirmDelete} autoFocus />
        </div>
    );
  }

  const imageBodyTemplate = (rowData) => {     
    return <img src={`../Images/nuevos/${rowData.Imagen}`} alt={'Imágen del vehículo'} style={{width: '50px', height: '50px'}} />;
  };

  const onUpload = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  return (
    <div className="card">
            <Toast ref={toast} />
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={vehiculo.Id ? 'Editar' : 'Agregar'}>
                    <div className="flex justify-content-center mt-4">
                        <div className="card flex flex-col justify-content-center gap-3 w-full md:w-3/4">
                            <h1 className="col-span-2 text-center font-bold text-4xl">
                                { vehiculo.Id ? 'Editar Vehiculo' : 'Registrar Nuevo Vehículo' }
                            </h1>
                            <div className="flex flex-wrap gap-3 mb-4 mt-4">
                                <div className="flex-auto">
                                    <label htmlFor="Modelo" className="font-bold block mb-2">
                                        Modelo
                                    </label>
                                    <InputText name="Modelo" value={vehiculo.Modelo} onChange={handlevehiculoChange} className="w-full" keyfilter=""  maxLength={255} placeholder="Modelo del vehículo" height={45} required />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="Marca" className="font-bold block mb-2">
                                        Marca
                                    </label>
                                    <InputText name="Marca" value={vehiculo.Marca} onChange={handlevehiculoChange} className="w-full" keyfilter="" placeholder="Marca del vehículo" maxLength={75} height={45} required />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="Anio" className="font-bold block mb-2">
                                        Año
                                    </label>
                                    <InputText name="Anio" value={vehiculo.Anio} onChange={handlevehiculoChange} className="w-full" keyfilter="num" placeholder="Año del vehículo" minLength={4} maxLength={4} height={45}  required />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="PrecioGerente" className="font-bold block mb-2">
                                      PrecioGerente
                                    </label>
                                    <InputText name="PrecioGerente" value={vehiculo.PrecioGerente} onChange={handlevehiculoChange} className="w-full" keyfilter="num" placeholder="Precio del vehículo"  height={45} minLength={8} maxLength={8} />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-4">                                
                                <div className="flex-auto">
                                    <label htmlFor="PresioWeb" className="font-bold block mb-2">
                                      PresioWeb
                                    </label>
                                    <InputText name="PresioWeb" value={vehiculo.PresioWeb} onChange={handlevehiculoChange} className="w-full" keyfilter="num" placeholder="Precio del vehículo en la web" height={45}  minLength={4} maxLength={8} />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="PrecioLista" className="font-bold block mb-2">
                                        Precio Lista
                                    </label>
                                    <InputText name="PrecioLista" value={vehiculo.PrecioLista} onChange={handlevehiculoChange} className="w-full" keyfilter="num" placeholder="Precio del vehículo en la lista" minLength={8} maxLength={8} />
                                </div>                                
                                <div className="flex-auto">
                                    <label htmlFor="MarcaID" className="font-bold block mb-2">
                                        Marca
                                    </label>
                                    <InputText name="MarcaID" value={vehiculo.MarcaID} onChange={handlevehiculoChange} className="w-full" keyfilter="" placeholder="Marca del vehículo" maxLength={100} required />
                                </div>
                                <div className="flex-auto">
                                    <label htmlFor="Condicion" className="font-bold block mb-2">
                                        Condicion
                                    </label>
                                    <InputText name="Condicion" value={vehiculo.Condicion} onChange={handlevehiculoChange} className="w-full" keyfilter="" placeholder="Usado o nuevo" maxLength={100} required />
                                </div>
                                <div className="flex-auto">
                                    {/* <label htmlFor="Imagen" className="font-bold block mb-2">
                                        Imagen
                                    </label> */}
                                    {/* <InputText name="Imagen" value={vehiculo.Imagen} onChange={handlevehiculoChange} className="w-full" keyfilter="" placeholder="" maxLength={100} required /> */}
                                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel='Imágen' />
                                </div>
                            </div>
                            <div className="card flex flex-col justify-center items-center gap-3 w-full md:w-3/4">
                                <div className="flex-shrink-0">
                                    <Button
                                        className='text-white text-sm bg-sky-600 p-3 rounded-md font-bold md:mt-0'
                                        label={vehiculo.Id ? 'Guardar cambios' : 'Guardar'}
                                        loading={loading}
                                        onClick={checkvehiculo}
                                        style={{ maxWidth: '10rem' }}
                                    />
                                    {vehiculo?.Id && (
                                        <Button
                                            className='text-white text-sm bg-red-600 p-3 rounded-md font-bold md:mt-0 ml-2'
                                            label="Cancelar"
                                            icon="pi pi-times"
                                            onClick={resetState}
                                            style={{ maxWidth: '10rem' }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Listar">
                    <div className="flex flex-col justify-content-center">
                        <div className="mt-2">Filtrar vehículos</div>
                        <div className="flex gap-3 mt-2">
                            <InputText
                                keyfilter=""
                                placeholder="Buscar vehiculo por modelo y marca"
                                value={globalvehiculoFilterValue}
                                onChange={onGlobalvehiculoFilterChange}
                                className="w-full md:w-25rem"
                            />
                        </div>
                    </div>
                    <div className="card mt-3">
                        <DataTable
                            dataKey="Id"
                            value={vehiculos}
                            size={'small'}
                            tableStyle={{ minWidth: '50rem' }}
                            loading={loading}
                            showGridlines
                            paginator
                            rows={25}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            selectionMode="single"
                            filters={vehiculoFilters}
                            onSelectionChange={(e) => setSelectedVehiculo(e.value)}
                            scrollable
                            scrollHeight="500px"
                            globalFilter={globalvehiculoFilterValue}
                            removableSort
                            className='border border-black-200 divide-y divide-black-200'
                        >
                            <Column body={actionBodyTemplate} header="Acciones" exportable={false} style={{ width: '150px' }}></Column>
                            <Column field="Modelo" header="Modelo"></Column>
                            <Column field="Marca" header="Marca"></Column>
                            <Column field="Anio" header="Anio" style={{ width: '10%' }}></Column>
                            <Column field="PrecioGerente" header="Precio Gerente" ></Column>
                            <Column field="PresioWeb" header="Precio Web"></Column>
                            <Column field="PrecioLista" header="Precio Lista"></Column>                            
                            <Column body={imageBodyTemplate} header="Imagen"></Column>
                            <Column field="Condicion" header="Condición"></Column>
                            <Column body={verifiedBodyTemplate} field="Inhabilitado" header="Activo"></Column>
                        </DataTable>
                    </div>
                    {vehiculoDialog && <VehiculoDetail
                        vehiculoDialog={vehiculoDialog}
                        setVehiculoDialog={setVehiculoDialog}
                        vehiculoRecord={vehiculoRecord}
                    />}
                </TabPanel>
            </TabView>
            <Dialog
                header="Confirmación"
                visible={showDeleteDialog}
                style={{ width: '25vw', height: '16vw' }}
                footer={renderFooter('displayBasic')}
                onHide={() => setShowDeleteDialog(false)}
            >
                <div style={{ wordWrap: 'break-word' }}>
                    ¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.
                </div>
            </Dialog>
    </div>
  )
}

export default VehiculosPages