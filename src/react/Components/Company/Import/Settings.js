import React from 'react'
import { DropdownButton, Dropdown, Form } from 'react-bootstrap'


const Settings = ({ apiMode, fileMode, formData, handleModeUpdate, handleSettingsUpdate }) => (
    <React.Fragment>
        <p>You can change import settings or go to the next step.</p>
        <em>All the changes are being saved automatically</em>

        <Form onSubmit={e => handleSubmit(e)} >
            <Form.Group controlId="mode">
                <Form.Label>Select import mode</Form.Label>
                <DropdownButton variant="info" title={formData.mode === fileMode ? 'File mode' : 'API mode'} onSelect={handleModeUpdate}>
                    <Dropdown.Item eventKey={apiMode} active={formData.mode === apiMode}>API mode</Dropdown.Item>
                    <Dropdown.Item eventKey={fileMode} active={formData.mode === fileMode}>File mode</Dropdown.Item>
                </DropdownButton>
            </Form.Group>

            <Form.Group controlId="url">
                <Form.Label>API address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="example: https://your-website/api/..."
                    onChange={handleSettingsUpdate}
                    value={formData.url || ''}
                    required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="interval">
                <Form.Label>Interval of requests</Form.Label>
                <Form.Control
                    type="number"
                    onChange={handleSettingsUpdate}
                    value={formData.interval || 0}
                    required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Form>
    </React.Fragment>
)


export default Settings