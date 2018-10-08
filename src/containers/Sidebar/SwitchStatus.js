import React from "react";
import { Switch } from "antd";

export default ({ handleOnlineOffline }) => {
	return (
		<div className="switchStatus">
			<div>
				<h3>
					<Switch
						onChange={handleOnlineOffline}
						checkedChildren="ONLINE"
						unCheckedChildren="OFFLINE"
					/>
				</h3>
			</div>
		</div>
	);
};
