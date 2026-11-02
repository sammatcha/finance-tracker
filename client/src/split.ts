
export default function splitAmount(deposit: number, buckets: { key: string; label: string; percentage: number }[]): {[key: string]: number } {
   const results :{ [key:string]: number } = {};
   let total = 0;

   for (const bucket of buckets) {
    const amount = deposit * (bucket.percentage / 100);
    results[bucket.key] = amount;
    total += amount;
    
   }

   const leftOver = deposit - total;
   results['left_over'] = leftOver;

   return results;
}