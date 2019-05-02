import React, { useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'


const steps = {
    1: {
        progress: { percentage: 20, name: 'Settings', variant: 'info' },
        error: null
    },
    2: {
        progress: { percentage: 40, name: 'Import', variant: 'primary' },
        error: 'You need to specify url first'
    },
    3: {
        progress: { percentage: 60, name: 'Selection', variant: 'primary' },
        error: 'You have to fetch data first'
    },
    4: {
        progress: { percentage: 80, name: 'Connections', variant: 'primary' },
        error: 'You have to specify uploadable data first'
    },
    5: {
        progress: { percentage: 100, name: 'Uploading', variant: 'success' },
        error: 'You have to set up connections first'
    }
}


const Stepper = ({ step, setStep, rawData, importedStructure, connections, children, url, mode, apiMode }) => {
    const [error, setError] = useState(null)
    const [progress, setProgress] = useState(steps[1].progress)


    const handleNextStep = () => {
        setError(null)
        const nextStep = ++step

        switch (nextStep) {
            case 2:
                if (mode === apiMode && !url) {
                    setError(steps[2].error)
                }
                setProgress(steps[2].progress)
                setStep(nextStep)
                break;
            case 3:
                if (rawData) {
                    setProgress(steps[3].progress)
                    setStep(nextStep)
                }
                else setError(steps[3].error)
                break;
            case 4:
                if (importedStructure) {
                    setProgress(steps[4].progress)
                    setStep(nextStep)
                }
                else setError(steps[4].error)
                break;
            case 5:
                if (connections) {
                    setProgress(steps[5].progress)
                    setStep(nextStep)
                }
                else setError(steps[5].error)
                break;
        }
    }


    const handlePrevStep = () => {
        setError(null)
        const prevStep = --step
        setProgress(steps[prevStep].progress)
        setStep(prevStep)
    }

    return (
        <div className='stepper-wrapper'>
            <ProgressBar variant={progress.variant} now={progress.percentage} label={`${progress.name} ${step}/5`} />
            <div className='stepper-content-wrapper'>
                {children}
            </div>
            {error && <div className='stepper-error-wrapper'>
                <p className='error'>{error}</p>
            </div>}
            <div className='stepper-bottom-wrapper'>
                <Button variant={progress.variant} disabled={step <= 1} onClick={handlePrevStep}>Previous</Button>
                <Button variant={progress.variant} disabled={step >= 5} onClick={handleNextStep}>Next</Button>
            </div>
        </div>
    )
}


export default Stepper