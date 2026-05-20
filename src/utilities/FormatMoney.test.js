import {it,expect,describe} from 'vitest'
import FormatMoney from './FormatMoney'

describe('Format Money',()=>{
it('display upto 2 decimal number',()=>{
    expect(FormatMoney(100)).toBe('$1.00')
    expect(FormatMoney(899)).toBe('$8.99')
})
it('format 1999 cents as $19.99',()=>{
    expect(FormatMoney(1999)).toBe('$19.99')
})
})
 