---
title: WSL
definition: WSL permite executar distribuições Linux diretamente no Windows, integrando ferramentas de linha de comando dos dois ambientes.
aliases:
  - Windows Subsystem for Linux
  - Linux no Windows
categories:
  - desenvolvimento
---

## Comandos úteis

Execute estes comandos no PowerShell ou no Prompt de Comando do Windows.

- **`wsl --install`** — instala WSL e, por padrão, uma distribuição Linux inicial.
- **`wsl --list --online`** — lista as distribuições disponíveis para instalação.
- **`wsl --list --verbose`** — mostra as distribuições instaladas, seu estado e a versão WSL usada.
- **`wsl --set-default-version 2`** — define o WSL 2 como padrão para novas distribuições.
- **`wsl --set-default <nome>`** — escolhe a distribuição iniciada ao executar apenas `wsl`.
- **`wsl --distribution <nome>`** — inicia a distribuição indicada.
- **`wsl --update`** — atualiza o WSL.
- **`wsl --status`** — exibe informações gerais sobre a configuração do WSL.
- **`wsl --shutdown`** — encerra todas as distribuições em execução e a máquina virtual do WSL.
- **`wsl --manage <nome> --move <pasta>`** — move os arquivos de uma distribuição existente para outra pasta; disponível em versões recentes do WSL.
- **`wsl --export <nome> <arquivo.tar>`** — exporta uma distribuição para um arquivo de backup.
- **`wsl --import <nome> <pasta-instalação> <arquivo.tar> --version 2`** — importa um backup como uma nova distribuição WSL 2 no local escolhido.
- **`wsl --import-in-place <nome> <arquivo.vhdx>`** — registra uma distribuição a partir de um VHDX existente, sem extraí-lo de um TAR.

## Exemplo: mover o disco virtual da distribuição

O disco da distribuição WSL 2 é o arquivo `ext4.vhdx`. Em versões recentes, mova-o com:

```powershell
# PowerShell: confira o nome da distribuição e encerre o WSL
wsl --list --verbose
wsl --shutdown
wsl --manage Ubuntu --move "D:\Linux\Ubuntu"
```

Troque o nome e o destino. Se `--move` não estiver disponível, atualize o WSL ou use exportação/importação.

### Alternativa: exportar e importar

Alternativa para versões sem `--move`:

```powershell
# PowerShell: feche a distribuição antes da exportação
wsl --shutdown
wsl --export Ubuntu D:\WSL\Ubuntu\ext4.vhdx --format vhd

# Destrutivo: apaga os dados registrados da distribuição
wsl --unregister Ubuntu

# Registre o VHDX exportado no destino
wsl --import-in-place Ubuntu D:\WSL\Ubuntu\ext4.vhdx
wsl --list --verbose
```

Verifique o backup antes de `--unregister`: esse comando apaga os dados da distribuição. Mantenha o VHDX até confirmar a importação.

### Dados do Docker Desktop

Mude o disco do Docker Desktop em **Settings → Resources → Advanced → Disk image location**. Não mova nem desregistre manualmente as distribuições gerenciadas pelo Docker.

Após importar, se necessário, defina o usuário padrão em `/etc/wsl.conf`:

```ini
[user]
default=<usuario-linux>
```

## Inspecionar ou montar o disco virtual

Anexe um VHD para inspeção e desmonte-o ao terminar:

```powershell
wsl --shutdown
wsl --mount <caminho-do-ext4.vhdx> --vhd --bare
# Ao terminar
wsl --unmount <caminho-do-ext4.vhdx>
```

`--bare` anexa sem montar; requer WSL compatível e privilégios administrativos.

Liste dispositivos com `lsblk`; identifique o sistema de arquivos com `sudo blkid /dev/<dispositivo>`.

## Compactar o arquivo VHDX

Com o módulo Hyper-V, desligue o WSL e compacte o VHDX:

```powershell
wsl --shutdown
Optimize-VHD -Path "<caminho-do-ext4.vhdx>" -Mode Full
```

Requer o módulo Hyper-V e pode exigir PowerShell elevado. Nunca compacte um disco em uso.

## Exemplo de configuração

```powershell
wsl --install
wsl --list --online
wsl --distribution Ubuntu
```

## Liberar espaço do disco virtual

Apagar arquivos Linux não reduz automaticamente o VHDX; use o procedimento de compactação acima.

## Referências

- [Comandos básicos do WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
- [Gerenciar o espaço em disco do WSL](https://learn.microsoft.com/en-us/windows/wsl/disk-space)
- [Referência de `Optimize-VHD`](https://learn.microsoft.com/en-us/powershell/module/hyper-v/optimize-vhd)
- [Montar um disco Linux no WSL 2](https://learn.microsoft.com/en-us/windows/wsl/wsl2-mount-disk)
- [Perguntas frequentes do WSL: mover uma distribuição](https://learn.microsoft.com/en-us/windows/wsl/faq)
- [Backend WSL 2 do Docker Desktop](https://docs.docker.com/desktop/features/wsl/)
