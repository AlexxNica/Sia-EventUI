import React from 'react'
import Paper from 'material-ui/Paper'

export const GridSet = (containerClass, rowClass, columnClass, children) => {
    let key = 0
    return (
        <div className={containerClass}>
            {children.map(child => Grid(rowClass, columnClass, child, key++))}
        </div>
    )
}

export const Grid = (rowClass, columnClass, children, key = 0) => {
    let rowKey = 0
    return (
        <Paper zDepth={2} key={key}>
            {children.map(child => GridRow(rowClass, columnClass, child, rowKey++))}
        </Paper>
    )
}

export const GridRow = (rowClass, columnClass, children, rowKey = 0) => {
    let columnKey = 0
    return (
        <div className={rowClass} key={rowKey}>
            {children.map(child => {
                return (
                    <div className={columnClass} key={columnKey++}>
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default Grid