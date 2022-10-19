import * as yup from "yup";
import { emailRule } from "./ValidationRules";
const DOC = $(document);
const Forms = (function () {
  "use strict";
  //#region Private methods

  function getFormDataObject(form) {
    const data = form.serializeArray();
    const dataObj = {};
    for (let i = 0; i < data.length; i++) {
      const field = data[i];
      dataObj[field.name] = field.value;
    }
    return dataObj;
  }

  const formSchema = yup.object().shape({
    email: emailRule,
  });

  const validationSchemas = {
    "signup-form": formSchema,
  };
  function setFieldError(field, error) {
    const formInput = $(`[name=${field}]`);
    if (!formInput.length) return;
    const inputParent = formInput.parents(".input-wrap");
    const helpBlock = inputParent.find(".input-wrap__error");
    if (!inputParent) return;
    if (!error) {
      inputParent.removeClass("has-error");
      helpBlock?.text("");
    } else {
      inputParent.addClass("has-error");
      helpBlock?.text(error);
    }
  }
  function validateForm(form, schema, showErrorInput) {
    const data = getFormDataObject(form);
    try {
      schema.validateSync(data, {
        abortEarly: false,
      });
      return true;
    } catch (errors) {
      const yupError = errors;
      if (showErrorInput && showErrorInput.length) {
        const name = showErrorInput.attr("name");
        if (!name) return;
        const inputError = yupError.inner.find((error) => {
          if (error.path === name) {
            return error;
          }
          return;
        });

        setFieldError(name, inputError?.message || false);
      } else {
        yupError.inner.map((error) => {
          const fieldName = error.path;
          const errorMessage = error.message;
          if (fieldName) {
            setFieldError(fieldName, errorMessage);
          }
        });
      }
      return false;
    }
  }
  //#endregion

  return {
    //#region Public methods
    onSignUpFormSubmit: function () {
      DOC.on("submit", ".js-registration-form", function (e) {
        const _this = $(this);
        const formID = _this.attr("id");
        if (!formID) return;
        try {
          const isValid = validateForm(_this, validationSchemas[formID]);
          if (!isValid) {
            e.preventDefault();
            return;
          }
        } catch (error) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const action = _this.attr("action");
        const data = getFormDataObject(_this);
        $.ajax({
          url: action,
          data: data,
          method: "POST",
          success: function () {
            _this.addClass("form--success");
          },
          error: function ({ responseJSON: data }) {
            if (data) {
              $.each(data.errors, function (i, value) {
                const field = value.field;
                const msg = value.msg;
                setFieldError(field, msg);
              });
            }
          },
        });
      });
    },
    onChangeInputs: function () {
      DOC.on("change", ".input-wrap input", function () {
        const _this = $(this);
        const value = _this.val();
        const parent = _this.parents(".input-wrap");
        if (value.length > 0) {
          parent.addClass("filled");
        } else {
          parent.removeClass("filled");
        }
        const form = this.form;
        const formID = $(form).data("validation-schema");
        if (!formID) return;
        validateForm($(form), validationSchemas[formID], _this);
      });
      DOC.on("focus", ".input-wrap input", function () {
        const _this = $(this);
        const name = _this.attr("name");
        if (!name) return;
        setFieldError(name, false);
      });
      DOC.on("blur", ".input-wrap input", function () {
        const _this = $(this);
        const form = this.form;
        const _form = $(form);
        const formID = $(form).data("validation-schema");
        if (!formID) return;
        validateForm(_form, validationSchemas[formID], _this);
      });
    },

    init: function () {
      this.onChangeInputs();
      this.onSignUpFormSubmit();
    },
    //#endregion
  };
})();

export default Forms;
