function appendones(m) {
	var result = m.slice();

	for(var i = 0; i < result.length; i++) {
		result[i].push(1);
	}
	return result;
}

function logistic(m) {
	var result = [];

	for(y = 0; y < m.length; y++) {
		var result_row = []

		for(x = 0; x < m[y].length; x++) {
			var f = 1.0 / (1.0 + Math.exp(-m[y][x]));
			result_row.push(f);
		}
		result.push(result_row);
	}

	return result;
}

function arraymult(m1, m2) {
	var result = [];

	for(y = 0; y < m1.length; y++) {

		row = []
		for(x = 0; x < m1[y].length; x++) {
			row.push(m1[y][x] * m2[y][x]);
		}
		result.push(row);
	}

	return result;
}

function matmult(m1, m2) {

	var m1_height = m1.length;
	var m1_width = m1[0].length;
	var m2_height = m2.length;
	var m2_width = m2[0].length;

    var result = [];

	for(var result_idx = 0; result_idx < m1_height; result_idx++) {
		var result_row = [];
		for(var x = 0; x < m2_width; x++) {
			var sum = 0;

			for(var y = 0; y < m1_width; y++) {
				sum += m1[result_idx][y] * m2[y][x];
			}
			result_row.push(sum);
		}
		result.push(result_row);
	}

    return result;
}

function transpose(m) {
	var m_cols = m[0].length;
	var m_rows = m.length;

	var out = [];
	for(m_col = 0; m_col < m_cols; m_col++) {
		out_row = []
		for(m_row = 0; m_row < m_rows; m_row++) {
			out_row.push(m[m_row][m_col]);
		}
		out.push(out_row);
	}

	return out;
}
