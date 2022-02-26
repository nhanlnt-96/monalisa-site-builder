import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "configs/axios";
import {finishUpdate} from "redux/finishUpdate/finishUpdateAction";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import EditorTitle from "components/editorTitle/EditorTitle";
import EditorComp from "components/editor/EditorComp";
import {getTeamContent} from "redux/teamContent/teamContentAction";
import MainTeam from "components/mainTeam/MainTeam";
import {UploadImg} from "components/uploadImg";
import LoadingComp from "components/loadingComp/LoadingComp";

const TeamEditor = () => {
  const dispatch = useDispatch();
  const teamContent = useSelector((state) => state.teamContent);
  const [memberSelected, setMemberSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [teamMemberName, setTeamMemberName] = useState("");
  const [teamMemberPosition, setTeamMemberPosition] = useState("");
  const [imgInfo, setImgInfo] = useState({
    imgName: "",
    imgUrl: ""
  });
  const onSelectMemberHandler = (index) => {
    setMemberSelected(index);
  };
  const onUpdateBtnClick = async () => {
    setIsLoading(true);
    const response = await api.patch(`/team/update/${teamContent.teamData[memberSelected].id}`, {
      name: teamMemberName || teamContent.teamData[memberSelected].name,
      position: teamMemberPosition || teamContent.teamData[memberSelected].position,
      imageName: imgInfo.imgName || teamContent.teamData[memberSelected]
        .imageName,
      imageUrl: imgInfo.imgUrl || teamContent.teamData[memberSelected]
        .imageUrl,
    });
    if (response.data.success) {
      setIsLoading(false);
      dispatch(finishUpdate(true));
      setTeamMemberName("");
      setTeamMemberPosition("");
      setImgInfo({
        imgName: "",
        imgUrl: ""
      });
      dispatch(getTeamContent());
    }
  };
  return (
    <Container fluid className="editor-container">
      {
        teamContent.teamData.length <= 0 ? (
          <LoadingComp/>
        ) : (
          <>
            <Row className="editor-top-container">
              <Col className="editor-item d-flex flex-column align-items-center">
                <EditorTitle title={(memberSelected === null) ? "Select member to edit" : `Editing member ${memberSelected + 1}`}/>
                <div className="select-part-button-container">
                  {
                    teamContent.teamData.map((val, index) => (
                      <button key={index} onClick={() => onSelectMemberHandler(index)}
                              className={`select-part-button-item bg-primary ${index === memberSelected && "select-part-button-item-active"}`}>Member {index + 1}
                      </button>
                    ))
                  }
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Member's Name"}/>
                <EditorComp newValue={setTeamMemberName} content={teamContent.teamData[memberSelected]?.name || ""}/>
              </Col>
            </Row>
            <Row className="editor-top-container">
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Member's position"}/>
                <EditorComp newValue={setTeamMemberPosition}
                            content={teamContent.teamData[memberSelected]?.position || ""}/>
              </Col>
              <Col lg={6} md={6} sm={12} className="editor-item">
                <EditorTitle title={"Image Upload"}/>
                <UploadImg imgFolder={"team"} imgInfo={imgInfo} setImgInfo={setImgInfo}
                           currentImgName={teamContent.teamData[memberSelected]
                             ?.imageName}
                           currentImgUrl={teamContent.teamData[memberSelected]
                             ?.imageUrl}/>
              </Col>
            </Row>
            <Row className="editor-update-button">
              <div className="update-button-container d-flex justify-content-center align-items-center">
                <Button className="update-btn" onClick={onUpdateBtnClick}
                        disabled={isLoading || (memberSelected === null)}>{isLoading ? "Updating" : "Update"}</Button>
              </div>
            </Row>
          </>
        )
      }
      <Row>
        <EditorTitle title={"Preview"}/>
        <MainTeam/>
      </Row>
    </Container>
  );
};

export default TeamEditor;