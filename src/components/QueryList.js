import React from 'react'

const QueryList = ({queries}) => {
    const queryList = queries.map((query) => <a href={query}>{query}</a>)
    console.log(queryList)
    return (
        <>
            {queryList}
        </>
    )
}

export default QueryList
