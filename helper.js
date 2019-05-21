{"data": [{"attributes": {"purchasedate": "04/01/2017", "medication": "meds", "cost": 100.0, "expirydate": "04/03/2017", "quantity": 100.0}, "type": "medical_inventory"}, {"attributes": {"purchasedate": "04/01/2017", "medication": "Extra Meds", "cost": 100.0, "expirydate": "04/02/2017", "quantity": 100.0}, "type": "medical_inventory"}, {"attributes": {"purchasedate": "04/01/2017", "medication": "Extra Super Meds", "cost": 267.0, "expirydate": "04/11/2017", "quantity": 250.0}, "type": "medical_inventory"}], "links": {"self": "/medical_inventory/"}}

$(document).ready(function () {
        $.ajax({
            url : '/api/medical_inventory/',
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                assignToEventsColumns(data);
            }
        });

  function assignToEventsColumns(data) {
      var table = $('#myTable').dataTable({
          "bAutoWidth": false,
          "aaData": data.data,
          "columns": [{
              "data": "attributes.medication"
          }, {
              "data": "attributes.quantity"
          }, {
              "data": "attributes.cost"
          }, {
              "data": "attributes.purchasedate"
          }, {
              "data": "attributes.expirydate"
          }]
      })
  }
    
    
    <table id="myTable" class="display" cellspacing="0" width="90%">
    <thead>
        <tr>
            <th>Medication</th>
            <th>Medication Quantity</th>
            <th>Mediaction Cost</th>
            <th>Purchase Date</th>
            <th>Expiry Date</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th>Medication</th>
            <th>Medication Quantity</th>
            <th>Mediaction Cost</th>
            <th>Purchase Date</th>
            <th>Expiry Date</th>
        </tr>
    </tfoot>
</table>
