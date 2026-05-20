export default function FormatMoney(amountCent){
    return `$${(amountCent/ 100).toFixed(2)}`
}