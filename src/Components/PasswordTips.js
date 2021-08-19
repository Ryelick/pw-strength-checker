import React from 'react'

export default function PasswordTips() {
    return (
        <>
            <div className="tips-box">
                <div className="results-header">TIPS IN CREATING A PASSWORD</div>
                <div className="text-suggestions">
                    <ul >
                        <li>Has more than 8 characters.</li>
                        <li>Contains both lowercase and uppercase letters.</li>
                        <li>Contains at least one numerical character.</li>
                        <li>Contains special characters.</li>
                        <li>Has more than 12 characters.</li>
                    </ul>
                </div>

            </div>
        </>
    )
}
