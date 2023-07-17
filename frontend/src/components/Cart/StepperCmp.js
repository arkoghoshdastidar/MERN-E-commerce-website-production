import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const StepperCmp = ({ activeIndex }) => {
    const steps = [
        'Shipping Info',
        'Confirm Order',
        'Payment'
    ];

    return (
        <>
            <Stepper activeStep={activeIndex} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}

export default StepperCmp;