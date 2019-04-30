import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const Settings = ({ settings, setSettings, mode, setMode, apiMode, fileMode }) => {

    const handleMode = mode => setMode(mode)

    const handleSettingsUpdate = () => {

    }

    return (
        <React.Fragment>

            <DropdownButton title={mode === fileMode ? 'File mode' : 'API mode'} onSelect={handleMode}>
                <Dropdown.Item eventKey={apiMode} active={mode === apiMode}>API mode</Dropdown.Item>
                <Dropdown.Item eventKey={fileMode} active={mode === fileMode}>File mode</Dropdown.Item>
            </DropdownButton>

            {mode === apiMode &&
                <div>
                    <input type="text" onChange={handleSettingsUpdate} value={settings['url'] || ''} placeholder="Please, enter the API url" />
                    <input type="text" onChange={handleSettingsUpdate} value={settings['interval'] || ''} placeholder="Please, enter the Interval in hours" />
                </div>

            }
        </React.Fragment>
    )
}


export default Settings