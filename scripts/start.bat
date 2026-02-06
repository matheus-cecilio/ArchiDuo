@echo off
echo.
echo ========================================
echo    Iniciando ArchiDuo
echo ========================================
echo.

REM 1. Verificar Docker
echo [1/5] Verificando Docker...
docker info >nul 2>&1
if errorlevel 1 (
    echo ERRO: Docker nao esta rodando!
    echo Inicie o Docker Desktop primeiro.
    exit /b 1
)
echo OK - Docker rodando

REM 2. Subir banco de dados
echo.
echo [2/5] Iniciando PostgreSQL...
docker-compose up -d
if errorlevel 1 (
    echo ERRO ao iniciar PostgreSQL
    exit /b 1
)

REM 3. Aguardar banco ficar pronto
echo.
echo [3/5] Aguardando banco ficar pronto...
timeout /t 5 /nobreak >nul
echo OK - Banco pronto

REM 4. Rodar migrations
echo.
echo [4/5] Aplicando migrations...
call npx prisma migrate deploy
if errorlevel 1 (
    echo Aviso: Erro nas migrations (pode ser normal na primeira vez)
)

REM 5. Verificar se precisa seed
echo.
echo [5/5] Verificando dados...
docker exec archiduo-postgres psql -U postgres -d archiduo -t -c "SELECT COUNT(*) FROM \"User\";" 2>nul | findstr /r "^[[:space:]]*0[[:space:]]*$" >nul
if not errorlevel 1 (
    echo Populando banco de dados...
    call npm run db:seed
) else (
    echo OK - Banco ja possui dados
)

REM 6. Iniciar Next.js
echo.
echo ========================================
echo    Tudo pronto!
echo ========================================
echo.
echo Credenciais de login:
echo   Email: matheus@archiduo.com
echo   Senha: senhasegura123
echo.
echo Acesse: http://localhost:3000
echo.

call npm run dev
