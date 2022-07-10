import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeServiceField,
  addService,
  getService,
  resetServiceFields,
} from "../Actions/action";
import spinner from "../img/spinner.png";
import { useNavigate, useParams } from "react-router-dom"

export default function ServiceAdd() {
  let { fields, loading, error, success } = useSelector(
    (state) => state.serviceAdd
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postId  = useParams();

  const id  = postId.id;

  useEffect(() => {
    if (id !== "add") {
      getService(dispatch, id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeServiceField(name, value));
  };

  const handleExit = () => {
    dispatch(resetServiceFields());
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addService(
      dispatch,
      fields.name,
      fields.price,
      fields.content,
      id === "add" ? 0 : Number(id)
    );
  };

  if (success) {
    handleExit();
  }

  if (error) {
    return (
      <div className="ServiceAdd">
        <div className="ServiceAdd__error">{error}</div>
        <div>
          <button type="button" onClick={handleExit}>
          Вернуться</button>
        </div>
      </div>
    );
  }

  return (
    <form className="ServiceAdd" onSubmit={handleSubmit}>
      <label>
        <div className="ServiceAdd__label">Название</div>
        <input
          className="ServiceAdd__input"
          name="name"
          onChange={handleChange}
          value={fields.name}
          disabled={loading ? true : false}
        />
      </label>
      <label>
        <div className="ServiceAdd__label">Стоимость</div>
        <input
          className="ServiceAdd__input"
          name="price"
          onChange={handleChange}
          value={fields.price}
          disabled={loading ? true : false}
        />
      </label>
      <label>
        <div className="ServiceAdd__label">Описание</div>
        <input
          className="ServiceAdd__input"
          name="content"
          onChange={handleChange}
          value={fields.content}
          disabled={loading ? true : false}
        />
      </label>
      <div className="ServiceAdd__controls">
        <button type="button" onClick={handleExit}>
        Отмена</button>
        {loading ? (
          <div className="ServiceAdd__button-spinner">
            <img src={spinner} alt="spinner" />
          </div>
        ) : (
          <button type="submit">Сохранить</button>
        )}
      </div>
    </form>
  );
}