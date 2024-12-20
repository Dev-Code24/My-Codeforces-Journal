(function(){
var m=(p,s,a)=>new Promise((e,d)=>{var i=o=>{try{t(a.next(o))}catch(r){d(r)}},n=o=>{try{t(a.throw(o))}catch(r){d(r)}},t=o=>o.done?e(o.value):Promise.resolve(o.value).then(i,n);t((a=a.apply(p,s)).next())});(function(){"use strict";document.body.insertAdjacentHTML("beforeend",`
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
`);let s;chrome.runtime.onMessage.addListener((e,d,i)=>{if(e.action==="openModal"&&(document.getElementById("extensionModalBackground").style.display="block",document.getElementById("modalMessage").textContent=""),e.action==="prefillModal"){const{data:n}=e,t=document.getElementById("submitButtonText");n.status==="success"&&n.problem?(s="updateProblem",t&&(t.innerText="Edit"),a(n.problem)):t&&(t.innerText="Submit")}});function a(e){document.getElementById("status").value=e.status,document.getElementById("remarks").value=e.remarks,document.getElementById("takeaways").value=e.takeaways,document.getElementById("extensionModalBackground").style.display="block"}document.getElementById("cancelModalButton").addEventListener("click",()=>{document.getElementById("extensionModalBackground").style.display="none"}),document.getElementById("submitModalButton").addEventListener("click",e=>m(this,null,function*(){e.preventDefault();const d=document.getElementById("submitButtonText"),i=document.getElementById("loadingSpinner"),n=document.getElementById("loadingSpinnerWrapper");d.style.display="none",n.style.display="inline-block",i.style.display="inline-block";const t=document.getElementById("status").value,o=document.getElementById("remarks").value,r=document.getElementById("takeaways").value,u={remarks:o,takeaways:r,status:t};s||(s="submitProblem"),chrome.runtime.sendMessage({action:s,data:u},c=>{d.style.display="inline",n.style.display="none",i.style.display="none";const l=document.getElementById("modalMessage");c.status==="success"?(l.textContent="Submission successful!",l.style.color="green"):(l.textContent=`Error: ${c.error}`,l.style.color="red")})}))})();

})();