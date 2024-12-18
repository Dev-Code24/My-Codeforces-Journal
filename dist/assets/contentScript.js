(function(){
var m=(p,l,e)=>new Promise((a,s)=>{var o=t=>{try{d(e.next(t))}catch(i){s(i)}},n=t=>{try{d(e.throw(t))}catch(i){s(i)}},d=t=>t.done?a(t.value):Promise.resolve(t.value).then(o,n);d((e=e.apply(p,l)).next())});(function(){"use strict";document.body.insertAdjacentHTML("beforeend",`
<style>
  /* Loader Styles */
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13px;
    height: 13px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>

<div id="extensionModalBackground" style="display:none; position:fixed; inset:0; background-color:rgba(0, 0, 0, 0.7); z-index: 10000;">
  <div id="extensionModal" style="display:flex;flex-direction:column;position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:400px; padding:20px; background-color:white; border-radius:10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); font-family: Arial, sans-serif;">
    
    <!-- Message Area -->
    <div id="modalMessage" style="font-size: 16px; color: #333; margin-bottom: 10px;text-align:center;"></div>

    <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Status</h2>
    <textarea id="status" name="status" rows="2" style="flex-grow:1; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px; resize: none;" placeholder="Did you solve the problem yourself, or saw a solution ?"></textarea>
    
    <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Remarks on the problem</h2>
    <textarea id="remarks" name="remarks" rows="5" style="flex-grow:1; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px; resize: none;" placeholder="Were you able to solve the problem / Did your intuition work ?"></textarea>
    
    <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Takeaway from the problem</h2>
    <textarea id="takeaways" name="takeaways" rows="10" style="flex-grow:1; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px; resize: none;" placeholder="How did you solve the problem ? Explain your thought process."></textarea>
    
    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
      <button id="cancelModalButton" style="background-color: #ccc; padding: 6px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Close</button>
      <button type="submit" id="submitModalButton" style="background:transparent; color: rgb(38 38 38 / 1); padding: 6px 20px; border: 1px solid; border-color: rgb(38 38 38 / 1); border-radius: 5px; cursor: pointer; font-weight: bold; position: relative;">
        <span id="submitButtonText">Submit</span>
        <div id="loadingSpinnerWrapper" class="spinnerWrapper" style="display: none;width: 100%;">
        <div id="loadingSpinner" class="loader" style="display: none; position: relative;"></div>
        </div>
      </button>
    </div>
  </div>
</div>
`),chrome.runtime.onMessage.addListener((e,a,s)=>{if(e.action==="openModal"&&(document.getElementById("extensionModalBackground").style.display="block",document.getElementById("modalMessage").textContent=""),e.action==="prefillModal"){const{data:o}=e,n=document.getElementById("submitButtonText");o.status==="success"&&o.problem?(n&&(n.innerText="Edit"),l(o.problem)):n&&(n.innerText="Submit")}});function l(e){document.getElementById("status").value=e.status,document.getElementById("remarks").value=e.remarks,document.getElementById("takeaways").value=e.takeaways,document.getElementById("extensionModalBackground").style.display="block"}document.getElementById("cancelModalButton").addEventListener("click",()=>{document.getElementById("extensionModalBackground").style.display="none"}),document.getElementById("submitModalButton").addEventListener("click",e=>m(this,null,function*(){e.preventDefault();const a=document.getElementById("submitButtonText"),s=document.getElementById("loadingSpinner"),o=document.getElementById("loadingSpinnerWrapper");a.style.display="none",o.style.display="inline-block",s.style.display="inline-block";const n=document.getElementById("status").value,d=document.getElementById("remarks").value,t=document.getElementById("takeaways").value,i={remarks:d,takeaways:t,status:n};chrome.runtime.sendMessage({action:"submitProblem",data:i},c=>{a.style.display="inline",o.style.display="none",s.style.display="none";const r=document.getElementById("modalMessage");c.status==="success"?(r.textContent="Submission successful!",r.style.color="green"):(r.textContent=`Error: ${c.error}`,r.style.color="red")})}))})();

})();