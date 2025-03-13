import React from 'react'

function AdminLayout({children}) {
    return (
        <div className={"h-screen"}>
            {children}
        </div>
    )
}

export default AdminLayout