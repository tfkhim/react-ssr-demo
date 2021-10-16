import React, { FC } from 'react'

export interface AppProps {
    name: string
}

export const App: FC<AppProps> = ({ name }) => {
    return <h1>{`Hello ${name}!`}</h1>
}
