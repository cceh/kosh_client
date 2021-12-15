import React from 'react'

const QueryList = ({queries}) => {
    const queryList = queries.map((query) => <li><a href={query}>{query}</a></li>)
    return (
        <ul>
            {queryList}
        </ul>
    )
}

export default QueryList
