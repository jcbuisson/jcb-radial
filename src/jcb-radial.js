import { LitElement, css, html } from 'lit'
   
const R = 2000

export class Radial extends LitElement {

   static get properties() {
      return {
         value: { type: Number },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.value = 0
   }

   render() {
      if (this.value < 0) {
         // display '--' when value is negative
         return html`
            <svg viewBox="-5 -5 110 109" xmlns="http://www.w3.org/2000/svg">
               <text text-anchor="middle" dy="0.3em" class="text" fill="black" x="50" y="50">
                  --
               </text>
               <path d="M 50 0 A 50 50 0 1 1 49 0" style="stroke: #C4E1F1; fill:none;stroke-width:8;" stroke-linecap="round"/>
            </svg>
         `
      } else {
         const value = Math.round(Math.max(0, Math.min(this.value, 100)))
         const angle = 2*Math.PI*Math.min(value, 99.99) / 100.
         const plus180 = angle < Math.PI ? 0 : 1
         const xEnd = 50 + 50.*Math.sin(angle)
         const yEnd = 50 - 50.*Math.cos(angle)
         return html`
            <svg viewBox="-5 -5 110 109" xmlns="http://www.w3.org/2000/svg">
               <text text-anchor="middle" dy="0.3em" class="text" fill="black" x="50" y="50">
                  ${value}%
               </text>
               <path d="M 50 0 A 50 50 0 1 1 49 0" style="stroke: #C4E1F1; fill:none;stroke-width:8;" stroke-linecap="round"/>
               <path d="M 50 0 A 50 50 0 ${plus180} 1 ${xEnd} ${yEnd}" style="stroke: #4290CD; fill:none;stroke-width:9;" stroke-linecap="round"/>
            </svg>
         `
      }
   }

   static get styles() {
      return css`
         /* :host selects the host element (<jcb-radial>, not its shadow dom) */
         :host {
            display: inline-block; /* by default a CE is inline and width & height do not apply */
            width: 100%; /* <jcb-radial> takes full parent width */
            height: 100%; /* <jcb-radial> takes full parent height */
         }

         .text {
            text-align: center;
            font-weight: 600;
            font-size: 1.7em;
            font-family: var(--jcb-radial-font-family, sans-serif);
         }
      `
   }
}

window.customElements.define('jcb-radial', Radial)
