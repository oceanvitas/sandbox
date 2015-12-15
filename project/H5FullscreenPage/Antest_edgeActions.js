/***********************
* Adobe Edge Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
        //动画播放结束
        Symbol.bindTimelineAction(compId, symbolName, "Default Timeline", "complete", function(sym, e) {
        	globalSym.one = sym;    
        	console.log('one complete')
        });   

        Symbol.bindElementAction(compId, symbolName, "${E2}", "click", function(sym, e) {
            alert('e2')

        });	
      
   })("stage");
   //Edge symbol end:'stage'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-109228010");