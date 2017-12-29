import React from 'react'
import Timeline from '../Timeline/Timeline'

export const IncidentEventsName = () => {
    return 'IncidentEvents'
}

export const IncidentEvents = (ticketToIncidentIdMap) => [
    [
        [
            (key) =><strong key={key}>
                Incident Timeline:
            </strong>
        ]
    ],
    [
        <Timeline
            ticketId={ticketToIncidentIdMap[0][0]}
            incidentId={ticketToIncidentIdMap[0][1]}
        />
    ]
]
