$(document).ready(function(){


    // Landing Page - Start -----------------
    var _landingPage = $('.landing-screen');
    if (_landingPage.length) {

        $(".filter-input").on("keyup", function () {
            const filters = $(".filter-input");
            const rows = $("#taskTable tr");

            rows.show().filter(function () {
                let row = $(this);
                let match = true;
                // Loop through each filter input
                filters.each(function () {
                    let val = $(this).val().toLowerCase();
                    let colIndex = $(this).data("col");
                    let cellText = row.find("td").eq(colIndex).text().toLowerCase();

                    // If filter has value and cell doesn't match, mark for hiding
                    if (val && cellText.indexOf(val) === -1) {
                        match = false;
                        return false; // Break the .each loop early
                    }
                });
                return !match; // Return true to hide rows that don't match
            }).hide();
        });

        // --- 2. SORT LOGIC ---
        $(".sortable").on("click", function () {
            const table = $(this).closest('table');
            const tbody = table.find('tbody');
            const rows = tbody.find('tr').toArray();
            const colIndex = $(this).data('col');

            // Toggle state logic
            const isAscending = $(this).hasClass("asc");
            $(".sortable").removeClass("asc desc");
            console.log(isAscending)
            if (isAscending) {
                $(this).addClass("desc");
            } else {
                $(this).addClass("asc");
            }

            const direction = $(this).hasClass("asc") ? 1 : -1;

            rows.sort(function (a, b) {
                let valA = $(a).find('td').eq(colIndex).text().trim();
                let valB = $(b).find('td').eq(colIndex).text().trim();

                // REPLACEMENT FOR $.isNumeric: 
                // We check if the string is not empty and is a valid number
                const numA = parseFloat(valA);
                const numB = parseFloat(valB);
                const isNumA = !isNaN(numA) && isFinite(valA);
                const isNumB = !isNaN(numB) && isFinite(valB);

                if (isNumA && isNumB) {
                    return (numA - numB) * direction;
                }

                return valA.localeCompare(valB) * direction;
            });

            // Re-append to update the DOM
            tbody.append(rows);
        });
    }
    // Landing Page - End -----------------

    $('#worklist').on("change",function () {
        var _worklist = $(this).val();
        if (_worklist == 'My Tasks') {
            window.location.href = 'index.html';
        }
        else if (_worklist == 'CE Prescreen & Initial App Open Business Inventory ~ (VENDOR)') {
            window.location.href = 'worklist.html';
        }
    });

    
    let _worklistPage = $(".worklist-page");
    if (_worklistPage.length) {

        $.getJSON( "resources/data/worklistData.json", function( data ){
            _dynamic_content = data;
                
            $('#taskTable').html('');
            
            $.each(_dynamic_content, function (index, item) {
                let _tblData = `<tr>
                    <td><input class="form-check-input" type="checkbox"/></td>
                    <td><a href="#">${item.Task_ID}</a></td>
                    <td>${item.Status}</td>
                    <td>${item.Received_Date}</td>
                    <td>${item.Assigned_To}</td>
                    <td>${item.Priority}</td>
                    <td>${item.MP3_ID}</td>
                    <td>${item.Provider_Name}</td>
                </tr>`;
                $('#taskTable').append(_tblData);
            });
    
          }).fail(function() {
         //   alert( "error in loading Data" );
          });

        $(".filter-input").on("keyup", function () {
            const filters = $(".filter-input");
            const rows = $("#taskTable tr");

            rows.show().filter(function () {
                let row = $(this);
                let match = true;
                // Loop through each filter input
                filters.each(function () {
                    let val = $(this).val().toLowerCase();
                    let colIndex = $(this).data("col");
                    let cellText = row.find("td").eq(colIndex).text().toLowerCase();

                    // If filter has value and cell doesn't match, mark for hiding
                    if (val && cellText.indexOf(val) === -1) {
                        match = false;
                        return false; // Break the .each loop early
                    }
                });
                return !match; // Return true to hide rows that don't match
            }).hide();
        });

        // --- 2. SORT LOGIC ---
        $(".sortable").on("click", function () {
            const table = $(this).closest('table');
            const tbody = table.find('tbody');
            const rows = tbody.find('tr').toArray();
            const colIndex = $(this).data('col');

            // Toggle state logic
            const isAscending = $(this).hasClass("asc");
            $(".sortable").removeClass("asc desc");
            console.log(isAscending)
            if (isAscending) {
                $(this).addClass("desc");
            } else {
                $(this).addClass("asc");
            }

            const direction = $(this).hasClass("asc") ? 1 : -1;

            rows.sort(function (a, b) {
                let valA = $(a).find('td').eq(colIndex).text().trim();
                let valB = $(b).find('td').eq(colIndex).text().trim();

                // REPLACEMENT FOR $.isNumeric: 
                // We check if the string is not empty and is a valid number
                const numA = parseFloat(valA);
                const numB = parseFloat(valB);
                const isNumA = !isNaN(numA) && isFinite(valA);
                const isNumB = !isNaN(numB) && isFinite(valB);

                if (isNumA && isNumB) {
                    return (numA - numB) * direction;
                }

                return valA.localeCompare(valB) * direction;
            });

            // Re-append to update the DOM
            tbody.append(rows);
        });

        $("#taskTable").on("click", "a", function (event) {
            event.preventDefault();
            console.log(event)
            let _taskID = $(this).text();
            localStorage.setItem("taskID", _taskID);
            window.location.href = "details.html";
        });

      }
});