from fastapi.responses import JSONResponse

class ResponseHandler:
    @staticmethod
    def success_response(data=None, message="Success", code=200):
        return JSONResponse(
            status_code=code,
            content={
                "status": "success",
                "message": message,
                "data": data
            }
        )

    @staticmethod
    def error_response(message="Error", code=400, errors=None):
        return JSONResponse(
            status_code=code,
            content={
                "status": "error",
                "message": message,
                "errors": errors if errors is not None else message
            }
        ) 