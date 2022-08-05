import { faEnvelope, faMailBulk, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Person } from "../../../../../types/PersonSchema";
import { useWindowWidth } from "../../../../hooks";
import ClampLines from "../../../utilities/clampLines/ClampLines";

const AssignmentItem = ({ personData }: { personData: Person }) => {
	const mediumWidth = useWindowWidth(576);
	return (
		<div className="people-item-container">
			<div className="people-item-image-container">
				{personData.main_image && (
					<img
						className="people-item-image"
						src={personData.main_image.href}
						alt={personData.main_image.description}
					/>
				)}
			</div>
			<div className="people-item-content">
				<div className="people-item-row">
					<ClampLines
						id={personData.name}
						className="people-item-name"
						text={personData.name}
						lines={1}
						ellipsis="..."
						innerElement="div"
						buttons={false}
					/>
					<div className="people-item-email">{personData.email}</div>
					<div className="people-item-text">{personData.custom_field}</div>
					<div className="people-item-actions">
						<div className="people-item-action-button">
							<FontAwesomeIcon icon={faEnvelope} />
						</div>
						<div className="people-item-action-button">
							<FontAwesomeIcon icon={faTrashAlt} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AssignmentItem;
