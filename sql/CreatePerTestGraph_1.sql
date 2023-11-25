--CREA TABELLA

USE [FirstData]
GO

/** Object:  Table [dbo].[RegistroVendite]    Script Date: 10/11/2023 19:55:24 **/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RegistroVendite](
	[ID] [int] NOT NULL,
	[IDCliente] [int] NOT NULL,
	[NomeArticolo] [nvarchar](50) NOT NULL,
	[PrezzoDiVendita] [int] NOT NULL,
	[MeseVendita] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
