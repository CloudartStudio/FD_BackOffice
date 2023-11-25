delete RegistroVendite -- solo per sviluppo

--RIEMPIE LA TABELLA

INSERT INTO RegistroVendite
VALUES (0,0,'test art2',100,'gen')
INSERT INTO RegistroVendite
VALUES (1,0,'test art1',200,'gen')
INSERT INTO RegistroVendite
VALUES (0,0,'test art2',100,'gen')
INSERT INTO RegistroVendite
VALUES (0,0,'test art1',200,'gen')

select * from RegistroVendite as r where r.MeseVendita like 'gen' 

INSERT INTO RegistroVendite
VALUES (0,0,'test art1',200,'feb')
INSERT INTO RegistroVendite
VALUES (1,0,'test art1',200,'feb')
INSERT INTO RegistroVendite
VALUES (0,0,'test art2',100,'feb')
INSERT INTO RegistroVendite
VALUES (0,0,'test art3',1000,'feb')

select * from RegistroVendite as r where r.MeseVendita like 'feb' 

INSERT INTO RegistroVendite
VALUES (0,0,'test art1',200,'marz')
INSERT INTO RegistroVendite
VALUES (1,0,'test art1',200,'marz')
INSERT INTO RegistroVendite
VALUES (0,0,'test art2',100,'marz')
INSERT INTO RegistroVendite
VALUES (0,0,'test art3',1000,'marz')
INSERT INTO RegistroVendite
VALUES (0,0,'test art3',1000,'marz')
INSERT INTO RegistroVendite
VALUES (0,0,'test art3',1000,'marz')
INSERT INTO RegistroVendite
VALUES (0,0,'test art3',1000,'marz')

select * from RegistroVendite as r where r.MeseVendita like 'marz' 

--obbiettivo:
--un grafico che mostra le vendite di ogni singolo articolo per mese. art2 vendita totali in euro (somma dei valori) per ogni mese confrontati per ogni valore. -> 3 grafici
select SUM(r.PrezzoDiVendita) as Totale,r.MeseVendita as Mese from RegistroVendite as r where r.MeseVendita like 'gen' group by r.MeseVendita 
select SUM(r.PrezzoDiVendita) as Totale,r.MeseVendita as Mese from RegistroVendite as r where r.MeseVendita like 'feb' group by r.MeseVendita 
select SUM(r.PrezzoDiVendita) as Totale,r.MeseVendita as Mese from RegistroVendite as r where r.MeseVendita like 'marz' group by r.MeseVendita 
--un grafico che mostra per ogni mese gli incassi totali
--un grafico che mostr per ogni mese il numero di vendite


--delete RegistroVendite -- solo per sviluppo