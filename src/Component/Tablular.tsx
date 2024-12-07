import { useEffect, useState } from 'react'
import './Tabular.css'
import { getCameraData, UpdateCameraData } from '../Service/getCameraData'
import { cameraDto } from '../CamerDataType/CameraDataDto'
import Header from './Header'
const Tabular = () => {
    const [cameraData, setCameraData] = useState<cameraDto[]>([])
    const [filtercameraData, setFilterCameraData] = useState<cameraDto[]>([])
    const [page, setPage] = useState(1);


    useEffect(() => {
        getCameraData().then((data) => {
            if (data) {
                setCameraData(data.data)
                setFilterCameraData(data.data)
                console.log(data.data.length)
            }
        })

    }, [])
    const handlePage = (selectedPage: number) => {
        setPage(selectedPage);
    };
    const updateStus =  (status:string,id:number) => {
         UpdateCameraData(status,id).then((res)=>{
            console.log(res)
         })
    }


    const TableHeader = ['NAME', 'HEALTH', 'LOCATION', 'RECORDER', 'TASKS', 'STATUS', 'ACTION']


    return (
        <div>
            <Header cameraData={cameraData} setFilterCameraData={setFilterCameraData} />
            <table>
                <thead>
                    <tr>
                        {TableHeader.map((item) => {
                            return (
                                <th>{item}</th>
                            )
                        })}
                    </tr>

                </thead>
                <tbody>
                    {filtercameraData.length > 0 ? (
                        filtercameraData.slice(page * 10 - 10, page * 10).map((data) => (
                            <tr key={data._id}>
                                <td><span className={data.status === 'Active' ? 'activeCircle inActiveCircle' : 'inActiveCircle'}></span>{data.name}</td>
                                <td><span>☁️{data.health?.cloud}</span><span>🏢{data.health.device}</span></td>
                                <td>{data.location}</td>
                                <td>{data.recorder}</td>
                                <td>{data.tasks}</td>
                                <td>  <span className={data.status === 'Active' ? 'active' : ' active inActive'}>{data.status} </span></td>
                                <td><button onClick={() => updateStus(data.status,data.id)} className='deleteBtn'>Delete</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center' }}>Loading...</td>
                        </tr>
                    )}

                </tbody>
                </table>
                <div className="pagination">
                    <button
                        onClick={() => handlePage(page - 1)}
                        className={`pagination-btn ${page <= 1 ? "disable" : ""}`}
                        disabled={page <= 1}
                    >
                        ◀
                    </button>
                    {[...Array(Math.ceil(filtercameraData.length / 10))].map((_, i) => (
                        <span
                            key={i}
                            onClick={() => handlePage(i + 1)}
                            className={`pagination-page ${page === i + 1 ? "selected" : ""}`}
                        >
                            {i + 1}
                        </span>
                    ))}
                    <button
                        onClick={() => handlePage(page + 1)}
                        className={`pagination-btn ${page >= Math.ceil(filtercameraData.length / 10) ? "disable" : ""}`}
                        disabled={page >= Math.ceil(filtercameraData.length / 10)}
                    >
                        ▶
                    </button>
                </div>

           
        </div>
    )
}

export default Tabular