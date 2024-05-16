"use strict";(()=>{var o="calc-input",n="calc-result",r=()=>{let calculators=document.querySelectorAll("[calc-name]");calculators.forEach(e=>{let t=e.querySelectorAll(`[${o}]`),c=e.querySelectorAll(`[${n}]`);console.group(`Webflow Calculator: ${e.getAttribute("calc-name")}`),console.log("Inputs",t.length),console.log("Results",c.length),console.groupEnd(),t.forEach(l=>{let u=l.getAttribute("default-value");u&&(l.value=u),l.addEventListener("input",s=>{calculate(c,e)})}),calculate(c,e)});function calculate(e,t){e.forEach(c=>{let l=c.getAttribute("calc-result");if(l){let u=getResult(l,t);console.log(u,parseInt(u)),u.includes(".00")&&(u=u.replace(".00","")),c.innerHTML=u}})}function getResult(feildValue,calculator){let replaceValues=feildValue.split(/{([^}]+)}/g),replacedValues=replaceValues.map(e=>{if(e.includes("attr.")){let t=calculator.querySelector(`[${o}=${e.replace("attr.","")} ]`);return t.value?t.value:0}else if(e.includes("checked.")){let t=e.split("?")[0],c=e.split("?")[1],l=calculator.querySelector(`[${o}=${t.replace("checked.","")} ]`);return l.checked?c:l.getAttribute("default-value")||"0"}else if(e.includes("unchecked.")){let t=e.split("?")[0],c=e.split("?")[1],l=calculator.querySelector(`[${o}=${t.replace("unchecked.","")} ]`);return l.checked?l.getAttribute("default-value")||"0":c}else return e});try{console.log(replacedValues.join(""));let result=eval(replacedValues.join(""));return parseFloat(result).toFixed(2).toString()}catch(e){return console.log(e),"ERR"}}},a=r;window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{a()});})();
