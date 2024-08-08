export function CapitalInfoDisplay({ rCCapitalName, rCNameCommon, rCFlag }) {
	return (
		<div>
			<h4>
				The secret capital city was{' '}
				{rCCapitalName + ', ' + rCNameCommon + ' ' + rCFlag}
			</h4>
		</div>
	);
}
