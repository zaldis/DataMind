import uuid
import datetime as dt
from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from src import schemas, utils, enums


""" TODO

API from this file should be moved to separated modules with routing logic.
"""


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@app.post(
    "/login",
    responses={
        200: {"model": schemas.LoginResponse, },
        401: {"model": schemas.ErrorResponse, },
    }
)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    username = form_data.username
    password = form_data.password
    try:
        user = utils.get_user_by_username(username)
    except ValueError as err:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(err))

    if utils.hash_password(password) != user.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> schemas.User:
    user = utils.decode_token(token)
    return user


@app.post(
    "/insight",
    status_code=201,
    responses={
        201: {"model": schemas.InsightCreationResponse, },
        401: {"model": schemas.ErrorResponse, },
    },
)
def create_new_insight(
    user: Annotated[schemas.User, Depends(get_current_user)],
    created_at: dt.datetime = Body(),
    type: enums.InsightType = Body(),
    severity: enums.InsightSeverity = Body(),
) -> uuid.UUID:
    _id = utils.create_machine_insight(
        created_at=created_at,
        type=type,
        severity=severity,
    )
    return _id


@app.get(
    "/insight",
    status_code=200,
    response_model=list[schemas.MachineInsight]
)
def get_insights(
    user: Annotated[schemas.User, Depends(get_current_user)],
    from_date: dt.datetime,
) -> list[schemas.MachineInsight]:
    return utils.get_machine_insights(from_date=from_date)
