import { cameraDto } from '../CamerDataType/CameraDataDto'
import Logo from '../Image/Logo.svg'
interface headerProp {
    cameraData:cameraDto[]
    setFilterCameraData:CallableFunction
}
const Header = ({cameraData,setFilterCameraData}:headerProp) => {
    const selectLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        if (value) {
            const filterCameraDataLocation = cameraData.filter((data) => data._id === value)
            setFilterCameraData(filterCameraDataLocation)
        }
    }
    const selectStaus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        if (value) {
            const filterStatus = cameraData.filter((data) => data.status === value)
            setFilterCameraData(filterStatus)
        }

    }
    const searchRecorder = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value.length >= 3) {
            const filterRecorder = cameraData.filter((data) => data.recorder.includes(value))
            setFilterCameraData(filterRecorder)
        }

    }

    return(
    <>
    <div className='Logo'>
    <img src={`${Logo}`} alt='Company Logo'/>
  </div>
  <header>
      <div>
          <h3>Cameras</h3>
          <p>Manage your camera here</p>
      </div>
      <input type="Search" placeholder='Search Recorder' onChange={(e) => searchRecorder(e)} />

  </header>
  <section>
      <div style={{ display: 'flex', gap: '12px' }}>
          <select onChange={(e) => selectLocation(e)} defaultValue='' >
              <option value="" disabled hidden> 📌 Location </option>
              {cameraData.length > 0 &&
                  cameraData.map((item) => {
                      return (
                          <option value={item._id} aria-label='Location'>{item.location}</option>
                      )
                  })
              }
          </select>
          <select onChange={(e) => selectStaus(e)} defaultValue=''>
              <option value="" disabled hidden>Status</option>
              <option value={'Active'}>Active</option>
              <option value={'Inactive'}>IN Active</option>
          </select>
      </div>

  </section>
  </>
    )
}
export default Header