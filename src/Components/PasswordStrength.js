import React from 'react'
import '../App.css'

export default function PasswordStrength(props) {

    const colorChange = (score) => {
        switch (score) {
            case 1:
                return '#f13712'

            case 2:
                return '#f16f12'

            case 3:
                return '#ffd45a'

            case 4:
                return '#b7ff3b'

            case 5:
                return '#2cd10f'

            default:
                break;
        }
    }

    return (
        <div className="indicator-container">
            {/* Colored indicators */}
            {
                [...Array(props.score)].map(() => {
                    return (
                        <div className="strength-indicator" style={{ background: colorChange(props.score) }} />
                    )
                })
            }
            {/* Default indicators */}
            {
                [...Array(5 - props.score)].map(() => {
                    return (
                        <div className="strength-indicator" style={{ background: "gray" }} />
                    )
                })
            }
        </div>
    )
}
