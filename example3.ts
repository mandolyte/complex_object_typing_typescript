// function to convert word frequency map
// to an object suitable for MaterialTable

interface ColumnValue {
    title: string;
    field: string;
}

export const wf_to_mt = ( ob => {
    const mt: { title: string, columns: ColumnValue[] } = { title: "", columns: [] };
    mt.title = "Word Frequency";
    mt.columns = [
        { title: 'Word', field: 'word' },
        { title: 'Count', field: 'count' },
    ];
    mt.data = [];
    Object.keys(ob).forEach ( w => {
        mt.data.push({ word: w, count: ob[w] })
    })

    mt.options = { sorting: true };

    return mt;
});