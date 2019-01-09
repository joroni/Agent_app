$(document).ready(function () {
	var base_url = 'http://178.128.63.151/slimapp/public/';
	// GET REQUEST

	ajaxGetQeue();
	$("#allQeues").click(function (event) {
		event.preventDefault();
		ajaxGetQeue();
	});


	$("#allCustomers").click(function (event) {
		event.preventDefault();
		ajaxGet();
	});



	// GET REQUEST
	$("#allUsers").click(function (event) {
		event.preventDefault();
		ajaxGetOnline();
	});




	function ajaxGetQeue() {
		$.ajax({
			type: "GET",
			url: window.location + "data/qeue.json",
			success: function (result) {
				$('#getQeueResultDiv ul').empty();
				var custList = "";
				$.each(result, function (i, qeue) {
					$('#getQeueResultDiv .list-group').append('<li class="nav-item active">'+
					'<a class="nav-link" href="#0">'+
						//'<i class="material-icons">dashboard</i>'+
						'<h3>'+ qeue.QUEUE_CODE +'</h3>'+
						'<p>'+ qeue.TRAN_TYPE + '</p>'+
					'</a>'+
				'</li>'
				)
				});
				console.log("Success: ", result);
			},
			error: function (e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});
	}

	// DO GET
	function ajaxGet() {
		$.ajax({
			type: "GET",
			url: window.location + "api/customers/all",
			success: function (result) {
				$('#getResultDiv ul').empty();
				var custList = "";
				$.each(result, function (i, customer) {
					$('#getResultDiv .list-group').append("<a href='#'>" + customer.firstname + " " + customer.lastname + "</a><br>")
				});
				console.log("Success: ", result);
			},
			error: function (e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});
	}






	function ajaxGetOnline() {
		$.ajax({
			type: "GET",
			url: base_url + "api/users",
			success: function (result) {
				$('#getUserResultDiv ul').empty();
				var custList = "";
				$.each(result, function (i, user) {
					$('#getUserResultDiv .list-group').append("<li><a href='#'>" + user.u_name + " " + user.u_phone + "</a><</li>")
				});
				console.log("Success: ", result);
			},
			error: function (e) {
				$("#getUserResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});
	}





	readProductData = function () {
		console.log("Pulling data...");
		loader.show();
		$.getJSON(base_url + '/public/api/products', function (data) {
			var items = [];
			products = data;
			// localStorage.setItem("products", JSON.stringify(data));
			loader.hide();
			console.log(data);
			console.log("Pulling data complete.");
			// var products = JSON.parse(localStorage.getItem("products"));
			$('#product-tbody').html("");
			for (var i = 0; i < products.length; i++) {

				var temp = '<tr><td>' + products[i].id + '</td>' +
					'<td><a href="#" onclick="readEditProductData(' + products[i].id +
					');" data-toggle="modal" class="item-link" data-target="#productModal" data-whatever="' +
					products[i].id +
					'">' + products[i].sku + '</a></td>' +
					'<td>' + products[i].name + '</td>' +
					'<td>' + products[i].cat + '</td>' +
					'<td>' + products[i].price + '</td></tr>';
				//   alert(temp);
				$('#product-tbody').append(temp);
			}

		});


	}
})
