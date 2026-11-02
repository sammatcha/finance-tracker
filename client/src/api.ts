
type Entry = {
    date: string;
    total :number;
    emergency: number;
    loan: number;
    student_loan: number;
    travel: number;
    invest: number;
    left_over: number;

}
export type SavedEntry = {
    id:number
    date: string;
    total :number;
    emergency: number;
    loan: number;
    student_loan: number;
    travel: number;
    invest: number;
    left_over: number;

}



export const getEntries = async () => {
    try{
        const result = await fetch('http://localhost:3001/entries')
        if(!result.ok){
            throw new Error('Could not retrieve entries');
        }
        return result.json();
    }catch(err){
        throw new Error('Could not retrieve entries' , {cause:err});
    }
}

export const createEntry = async (entry:Entry) => {
    try{
        const result = await fetch('http://localhost:3001/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
                body: JSON.stringify(entry),
        })
         if(!result.ok){
            throw new Error('Could not create entry');
        }
        return result.json();
    }catch(err){
        throw new Error('Could not create entry' , {cause:err}) ;
    }
}