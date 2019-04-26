import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const Settings = ({ settings, setSettings, mode, setMode, apiMode, fileMode }) => {

    const handleMode = mode => setMode(mode)

    return (
        <React.Fragment>

            <DropdownButton title={mode === fileMode ? 'File mode' : 'API mode'} onSelect={handleMode}>
                <Dropdown.Item eventKey={apiMode} active={mode === apiMode}>API mode</Dropdown.Item>
                <Dropdown.Item eventKey={fileMode} active={mode === fileMode}>File mode</Dropdown.Item>
            </DropdownButton>

            {mode === apiMode &&
                <div>
                    <p>URL:{settings.url || 'Not specified'}</p>
                    <p>Fetch interval:{settings.interval || 'None'}</p>
                </div>

            }
        </React.Fragment>
    )
}


export default Settings