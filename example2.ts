// function to convert word frequency map
// to an object suitable for MaterialTable
export const wf_to_mt = ( ob => {
    const mt: { title: string } = { title: "" };
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