const INPUT_ATTRIBUTE = "calc-input"
const RESULT_ATTRIBUTE = "calc-result"

const WebflowCalculator = () => {

    // get all calculators
    const calculators = document.querySelectorAll(`[calc-name]`)

    // loop through all calculators
    calculators.forEach(calculator => {

        const inputs: NodeListOf<HTMLInputElement> = calculator.querySelectorAll(`[${INPUT_ATTRIBUTE}]`)
        const results = calculator.querySelectorAll(`[${RESULT_ATTRIBUTE}]`)

        console.group(`Webflow Calculator: ${calculator.getAttribute('calc-name')}`)
        console.log("Inputs", inputs.length)
        console.log("Results", results.length)
        console.groupEnd()

        // initial calculate

        // add event listener to all inputs
        inputs.forEach(input => {

            const defaultValue = input.getAttribute('default-value')
            if (defaultValue) input.value = defaultValue

            input.addEventListener('input', (e) => {
                calculate(results, calculator)
            })

        })
        calculate(results, calculator)

    })

    function calculate(results: NodeListOf<Element>, calculator: Element) {

        results.forEach(resultFeild => {
            const feildValue = resultFeild.getAttribute('calc-result')
            // skips if no formula is found
            if (feildValue) {
                let finalValue = getResult(feildValue, calculator)
                console.log(finalValue, parseInt(finalValue))
                if (finalValue.includes('.00')) finalValue = finalValue.replace('.00', '')
                resultFeild.innerHTML = finalValue
            }
        })

    }

    function getResult(feildValue: string, calculator: Element) {
        // replace attribute values with actual values if found in the value string
        const replaceValues = feildValue.split(
            // regex to replace all values in the string that are inside the curly braces
            // example feildValue = "1200 + (30 + {attr.amount})"
            /{([^}]+)}/g
        )


        let replacedValues = replaceValues.map(i => {
            if (i.includes('attr.')) {
                // @ts-ignore
                const elm: HTMLInputElement = calculator.querySelector(`[${INPUT_ATTRIBUTE}=${i.replace('attr.', '')} ]`)
                return elm.value ? elm.value : 0

                // {attr.pages} + {checked.fast-delivery ? (+250) : (-250) }
            } else if (i.includes('checked.')) {
                const checkedValue = i.split('?')[0]
                const value = i.split('?')[1].split(':')[0]
                const checkedElm: HTMLInputElement = calculator.querySelector(`[${INPUT_ATTRIBUTE}=${checkedValue.replace('checked.', '')} ]`)!
                return checkedElm.checked ? value : (checkedElm.getAttribute('default-value') || '0')

            } else if (i.includes('unchecked.')) {
                const checkedValue = i.split('?')[0]
                const value = i.split('?')[1].split(':')[1]
                const checkedElm: HTMLInputElement = calculator.querySelector(`[${INPUT_ATTRIBUTE}=${checkedValue.replace('unchecked.', '')} ]`)!
                return checkedElm.checked ? (checkedElm.getAttribute('default-value') || '0') : value
            }
            else return i
        })

        try {
            let result = eval(replacedValues.join(''))
            return parseFloat(result).toFixed(2).toString();
        } catch (err) {
            console.log(err)
            return 'ERR';
        }
    }

}

export default WebflowCalculator;
