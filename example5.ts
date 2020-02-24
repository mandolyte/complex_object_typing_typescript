// function to convert word frequency map
// to an object suitable for MaterialTable

interface ColumnValue {
    title: string;
    field: string;
}

interface DataValue {
    word: string;
    count: number;
}

interface Options {
    sorting?: boolean,
    exportAllData?: boolean,
    exportButton?: boolean
}

export const wf_to_mt = ( ob => {
    const mt: { 
        title: string, 
        columns: ColumnValue[],
        data: DataValue[], 
        options: Options,
    } = { title: "", columns: [], data: [], options: {
        sorting: true,
        exportAllData: true,
        exportButton: true,
    } };

    mt.title = "Word Frequency";
    mt.columns = [
        { title: 'Word', field: 'word' },
        { title: 'Count', field: 'count' },
    ];
    Object.keys(ob).forEach ( w => {
        mt.data.push({ word: w, count: ob[w] })
    })

    //mt.options = { sorting: true };

    return mt;
});