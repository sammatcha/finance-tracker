import { useEffect, useState } from "react"
import buckets from "../buckets.ts"
import splitAmount from "../split"
import { createEntry, getEntries } from "../api"
import type { SavedEntry } from "../api"

export default function Form(){
    const [deposit, setDeposit] = useState('')
    const [date, setDate] = useState('')
    const [percents, setPercents] = useState(
        Object.fromEntries(buckets.map((bucket) => [bucket.key, String(bucket.percentage)]))
    )
    const split = splitAmount(
        Number(deposit),
        buckets.map((bucket) => ({
            ...bucket,
            percentage: Number(percents[bucket.key])
        })) 
    )
    const [entries, setEntries] = useState<SavedEntry[]>([])
    const [error, setError] = useState('')
    useEffect(() => {
        let ignore = false

        const load = async () => {
            try{
                const data = await getEntries()
                if (!ignore) setEntries(data)
            }   catch {
                if (!ignore) setError('Could not load paychecks')
            }
        }
        load()  
        return () => {
            ignore = true
        } 
    }, [])

    const [saving, setSaving] = useState(false)

    const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
       setSaving(true)
        try{
            const saved = await createEntry({
            date:date,
            total: Number(deposit), 
            emergency:split.emergency, 
            loan:split.loan,
            student_loan:split.student_loan, 
            travel:split.travel, 
            invest:split.invest, 
            left_over:split.left_over
            })
            setEntries((prev) => [saved, ...prev])
            setDeposit('')
        }catch(err) {
            setError('Could not save paychecks')
            console.error(err)
        }
        finally {
            setSaving(false)
        }
    }
    const [openId, setOpenId] = useState<number | null>(null)
   
    return(
        <div className="">
            <form 
                onSubmit={handleOnSubmit}
                className="flex  flex-col gap-4 text-left"
            >
        
            <div className="flex flex-col gap-1 ">
                <label htmlFor="date" className="">Date</label>
                <input
                    value={date}
                    id="date"
                    type="date"
                    required
                    name="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
                >
                </input>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="deposit" className="">Deposit Amount</label>
                <input
                    id="deposit"
                    value={deposit}
                    type="text"
                    name="deposit"
                    placeholder="$0.00"
                    onChange={(e) => setDeposit(e.target.value)}
                    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2"

                >
                </input>
            </div>
            <div className="flex flex-col gap-6">
                {buckets.map((bucket)=> (
                    <div key={bucket.key} className="flex flex-col gap-1">
                        <label htmlFor={bucket.key} className="text-sm text-neutral-400">{bucket.label}</label>
                        <div className="flex items-center gap-4 ">
                            <input
                                id={bucket.key}
                                value={percents[bucket.key]}
                                onChange={(e) => 
                                    setPercents({...percents, [bucket.key]: e.target.value})
                                }
                                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 w-20"
                            >
                            </input>
                            <span className="text-sm">%</span>
                            <span className="ml-auto ">${split[bucket.key].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-baseline border-t pt-4">
                <span className="text-sm md:text-xl text-neutral-600 dark:text-neutral-400">Left over</span>
                <span className={`text-xl font-semibold tabular-nums ${split.left_over < 0 ? "text-red-500" : "text-neutral-900 dark:text-neutral-100"}`}>
                    ${split.left_over.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>
                
            <button type="submit" disabled={saving} className="w-full rounded-lg border px-3 py-2 bg-blue-300 text-black disabled:opacity-50 disabled:cursor-not-allowed">
                Save
            </button>
            {error && <p>{error}</p>}
        </form>
 
        <div className=" mt-8 flex flex-col text-left">
            <h2>History</h2>
            {entries.map((entry) => (
                <div key={entry.id} className="flex flex-col gap-1 border-t py-3">
                    <button type="button" onClick={() => setOpenId(openId === entry.id ? null: entry.id)}  aria-expanded={openId === entry.id}>
                         <div className="flex justify-between">
                            <span>{new Date(entry.date).toLocaleDateString()}</span>
                            <span>${Number(entry.total).toFixed(2)}</span>
                        </div>
                            <span className="text-sm text-neutral-400">
                                Left over: ${Number(entry.left_over).toFixed(2)}
                            </span>
                    </button>

                    {openId === entry.id && (
                        <div>
                            {buckets.map((bucket) => (
                                <div key={bucket.key} className="flex justify-between">
                                 <span className="">{bucket.label}</span>
                                 ${Number(entry[bucket.key as keyof SavedEntry])}
                                </div>
                               
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        </div>
    
    )
}