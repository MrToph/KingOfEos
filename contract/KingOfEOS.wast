(module
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (import "env" "assert" (func $assert (param i32 i32)))
 (import "env" "prints" (func $prints (param i32)))
 (import "env" "read_message" (func $read_message (param i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (data (i32.const 4) "Pa\00\00")
 (data (i32.const 8416) "Init World!\n\00")
 (data (i32.const 8432) "kingofeos\00")
 (data (i32.const 8448) "claim\00")
 (data (i32.const 8464) "Claim \00")
 (data (i32.const 8480) "from\00")
 (data (i32.const 8496) "message shorter than expected\00")
 (export "memory" (memory $0))
 (export "init" (func $init))
 (export "apply" (func $apply))
 (export "_GLOBAL__sub_I_KingOfEOS.cpp" (func $_GLOBAL__sub_I_KingOfEOS.cpp))
 (func $_GLOBAL__sub_I_KingOfEOS.cpp
  (i64.store offset=8204 align=4
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=8212 align=4
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=8220 align=4
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=8228 align=4
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=8236 align=4
   (i32.const 0)
   (i64.const 0)
  )
  (i32.store offset=8244
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8248
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8252
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8256
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8260
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8264
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8268
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8272
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8276
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8280
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8284
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8288
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8292
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8296
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8300
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8304
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8308
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8312
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8316
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8320
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8324
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8328
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8332
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8336
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8340
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8344
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8348
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8352
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8356
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8360
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8364
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8368
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8372
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8376
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8380
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8384
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8388
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8392
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8396
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8400
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=8404
   (i32.const 0)
   (i32.const 0)
  )
 )
 (func $init
  (call $prints
   (i32.const 8416)
  )
 )
 (func $apply (param $0 i64) (param $1 i64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i64)
  (local $5 i64)
  (local $6 i64)
  (local $7 i64)
  (local $8 i32)
  (i32.store offset=4
   (i32.const 0)
   (tee_local $8
    (i32.sub
     (i32.load offset=4
      (i32.const 0)
     )
     (i32.const 64)
    )
   )
  )
  (set_local $5
   (i64.const 0)
  )
  (set_local $4
   (i64.const 59)
  )
  (set_local $3
   (i32.const 8432)
  )
  (set_local $6
   (i64.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i64.gt_u
          (get_local $5)
          (i64.const 8)
         )
        )
        (br_if $label$4
         (i32.gt_u
          (i32.and
           (i32.add
            (tee_local $2
             (i32.load8_s
              (get_local $3)
             )
            )
            (i32.const -97)
           )
           (i32.const 255)
          )
          (i32.const 25)
         )
        )
        (set_local $2
         (i32.add
          (get_local $2)
          (i32.const 165)
         )
        )
        (br $label$3)
       )
       (set_local $7
        (i64.const 0)
       )
       (br_if $label$2
        (i64.le_u
         (get_local $5)
         (i64.const 11)
        )
       )
       (br $label$1)
      )
      (set_local $2
       (select
        (i32.add
         (get_local $2)
         (i32.const 208)
        )
        (i32.const 0)
        (i32.lt_u
         (i32.and
          (i32.add
           (get_local $2)
           (i32.const -49)
          )
          (i32.const 255)
         )
         (i32.const 5)
        )
       )
      )
     )
     (set_local $7
      (i64.shr_s
       (i64.shl
        (i64.extend_u/i32
         (get_local $2)
        )
        (i64.const 56)
       )
       (i64.const 56)
      )
     )
    )
    (set_local $7
     (i64.shl
      (i64.and
       (get_local $7)
       (i64.const 31)
      )
      (i64.and
       (get_local $4)
       (i64.const 4294967295)
      )
     )
    )
   )
   (set_local $3
    (i32.add
     (get_local $3)
     (i32.const 1)
    )
   )
   (set_local $5
    (i64.add
     (get_local $5)
     (i64.const 1)
    )
   )
   (set_local $6
    (i64.or
     (get_local $7)
     (get_local $6)
    )
   )
   (br_if $label$0
    (i64.ne
     (tee_local $4
      (i64.add
       (get_local $4)
       (i64.const -5)
      )
     )
     (i64.const -6)
    )
   )
  )
  (block $label$6
   (br_if $label$6
    (i64.ne
     (get_local $6)
     (get_local $0)
    )
   )
   (set_local $5
    (i64.const 0)
   )
   (set_local $4
    (i64.const 59)
   )
   (set_local $3
    (i32.const 8448)
   )
   (set_local $6
    (i64.const 0)
   )
   (loop $label$7
    (block $label$8
     (block $label$9
      (block $label$10
       (block $label$11
        (block $label$12
         (br_if $label$12
          (i64.gt_u
           (get_local $5)
           (i64.const 4)
          )
         )
         (br_if $label$11
          (i32.gt_u
           (i32.and
            (i32.add
             (tee_local $2
              (i32.load8_s
               (get_local $3)
              )
             )
             (i32.const -97)
            )
            (i32.const 255)
           )
           (i32.const 25)
          )
         )
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 165)
          )
         )
         (br $label$10)
        )
        (set_local $7
         (i64.const 0)
        )
        (br_if $label$9
         (i64.le_u
          (get_local $5)
          (i64.const 11)
         )
        )
        (br $label$8)
       )
       (set_local $2
        (select
         (i32.add
          (get_local $2)
          (i32.const 208)
         )
         (i32.const 0)
         (i32.lt_u
          (i32.and
           (i32.add
            (get_local $2)
            (i32.const -49)
           )
           (i32.const 255)
          )
          (i32.const 5)
         )
        )
       )
      )
      (set_local $7
       (i64.shr_s
        (i64.shl
         (i64.extend_u/i32
          (get_local $2)
         )
         (i64.const 56)
        )
        (i64.const 56)
       )
      )
     )
     (set_local $7
      (i64.shl
       (i64.and
        (get_local $7)
        (i64.const 31)
       )
       (i64.and
        (get_local $4)
        (i64.const 4294967295)
       )
      )
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 1)
     )
    )
    (set_local $5
     (i64.add
      (get_local $5)
      (i64.const 1)
     )
    )
    (set_local $6
     (i64.or
      (get_local $7)
      (get_local $6)
     )
    )
    (br_if $label$7
     (i64.ne
      (tee_local $4
       (i64.add
        (get_local $4)
        (i64.const -5)
       )
      )
      (i64.const -6)
     )
    )
   )
   (br_if $label$6
    (i64.ne
     (get_local $6)
     (get_local $1)
    )
   )
   (call $prints
    (i32.const 8464)
   )
   (call $prints
    (i32.const 8480)
   )
   (i32.store8
    (i32.add
     (get_local $8)
     (i32.const 24)
    )
    (i32.const 0)
   )
   (i64.store align=4
    (i32.add
     (get_local $8)
     (i32.const 28)
    )
    (i64.const 0)
   )
   (i32.store
    (i32.add
     (get_local $8)
     (i32.const 36)
    )
    (i32.const 0)
   )
   (i32.store8
    (i32.add
     (get_local $8)
     (i32.const 40)
    )
    (i32.const 0)
   )
   (i32.store
    (i32.add
     (get_local $8)
     (i32.const 44)
    )
    (i32.const 0)
   )
   (i64.store offset=16
    (get_local $8)
    (i64.const 0)
   )
   (i32.store offset=48
    (get_local $8)
    (i32.const 0)
   )
   (i32.store
    (i32.add
     (get_local $8)
     (i32.const 52)
    )
    (i32.const 0)
   )
   (i32.store8
    (i32.add
     (get_local $8)
     (i32.const 56)
    )
    (i32.const 0)
   )
   (i32.store
    (i32.add
     (get_local $8)
     (i32.const 60)
    )
    (i32.const 0)
   )
   (call $assert
    (i32.gt_u
     (call $read_message
      (i32.add
       (get_local $8)
       (i32.const 8)
      )
      (i32.const 56)
     )
     (i32.const 55)
    )
    (i32.const 8496)
   )
   (drop
    (call $_ZN9kingofeos5claimD2Ev
     (i32.add
      (get_local $8)
      (i32.const 8)
     )
    )
   )
  )
  (i32.store offset=4
   (i32.const 0)
   (i32.add
    (get_local $8)
    (i32.const 64)
   )
  )
 )
 (func $_ZN9kingofeos5claimD2Ev (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 48)
      )
     )
    )
   )
   (br_if $label$0
    (i32.eqz
     (tee_local $4
      (i32.load
       (i32.add
        (get_local $0)
        (i32.const 52)
       )
      )
     )
    )
   )
   (i32.store
    (get_local $4)
    (tee_local $3
     (i32.add
      (i32.load
       (get_local $4)
      )
      (i32.const -1)
     )
    )
   )
   (br_if $label$0
    (get_local $3)
   )
   (br_if $label$0
    (i32.eqz
     (tee_local $1
      (i32.load
       (i32.add
        (get_local $0)
        (i32.const 44)
       )
      )
     )
    )
   )
   (br_if $label$0
    (i32.lt_s
     (tee_local $3
      (i32.load offset=8396
       (i32.const 0)
      )
     )
     (i32.const 1)
    )
   )
   (set_local $4
    (i32.const 8204)
   )
   (set_local $2
    (i32.add
     (i32.mul
      (get_local $3)
      (i32.const 12)
     )
     (i32.const 8204)
    )
   )
   (loop $label$1
    (br_if $label$0
     (i32.eqz
      (tee_local $3
       (i32.load
        (i32.add
         (get_local $4)
         (i32.const 4)
        )
       )
      )
     )
    )
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.gt_u
        (i32.add
         (get_local $3)
         (i32.const 4)
        )
        (get_local $1)
       )
      )
      (br_if $label$2
       (i32.gt_u
        (i32.add
         (get_local $3)
         (i32.load
          (get_local $4)
         )
        )
        (get_local $1)
       )
      )
     )
     (br_if $label$1
      (i32.lt_u
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 12)
        )
       )
       (get_local $2)
      )
     )
     (br $label$0)
    )
   )
   (i32.store
    (tee_local $4
     (i32.add
      (get_local $1)
      (i32.const -4)
     )
    )
    (i32.and
     (i32.load
      (get_local $4)
     )
     (i32.const 2147483647)
    )
   )
  )
  (block $label$4
   (br_if $label$4
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 32)
      )
     )
    )
   )
   (br_if $label$4
    (i32.eqz
     (tee_local $4
      (i32.load
       (i32.add
        (get_local $0)
        (i32.const 36)
       )
      )
     )
    )
   )
   (i32.store
    (get_local $4)
    (tee_local $3
     (i32.add
      (i32.load
       (get_local $4)
      )
      (i32.const -1)
     )
    )
   )
   (br_if $label$4
    (get_local $3)
   )
   (br_if $label$4
    (i32.eqz
     (tee_local $1
      (i32.load
       (i32.add
        (get_local $0)
        (i32.const 28)
       )
      )
     )
    )
   )
   (br_if $label$4
    (i32.lt_s
     (tee_local $3
      (i32.load offset=8396
       (i32.const 0)
      )
     )
     (i32.const 1)
    )
   )
   (set_local $4
    (i32.const 8204)
   )
   (set_local $2
    (i32.add
     (i32.mul
      (get_local $3)
      (i32.const 12)
     )
     (i32.const 8204)
    )
   )
   (loop $label$5
    (br_if $label$4
     (i32.eqz
      (tee_local $3
       (i32.load
        (i32.add
         (get_local $4)
         (i32.const 4)
        )
       )
      )
     )
    )
    (block $label$6
     (block $label$7
      (br_if $label$7
       (i32.gt_u
        (i32.add
         (get_local $3)
         (i32.const 4)
        )
        (get_local $1)
       )
      )
      (br_if $label$6
       (i32.gt_u
        (i32.add
         (get_local $3)
         (i32.load
          (get_local $4)
         )
        )
        (get_local $1)
       )
      )
     )
     (br_if $label$5
      (i32.lt_u
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 12)
        )
       )
       (get_local $2)
      )
     )
     (br $label$4)
    )
   )
   (i32.store
    (tee_local $4
     (i32.add
      (get_local $1)
      (i32.const -4)
     )
    )
    (i32.and
     (i32.load
      (get_local $4)
     )
     (i32.const 2147483647)
    )
   )
  )
  (block $label$8
   (br_if $label$8
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $0)
       (i32.const 16)
      )
     )
    )
   )
   (br_if $label$8
    (i32.eqz
     (tee_local $4
      (i32.load
       (i32.add
        (get_local $0)
        (i32.const 20)
       )
      )
     )
    )
   )
   (i32.store
    (get_local $4)
    (tee_local $3
     (i32.add
      (i32.load
       (get_local $4)
      )
      (i32.const -1)
     )
    )
   )
   (br_if $label$8
    (get_local $3)
   )
   (br_if $label$8
    (i32.eqz
     (tee_local $1
      (i32.load
       (i32.add
        (get_local $0)
        (i32.const 12)
       )
      )
     )
    )
   )
   (br_if $label$8
    (i32.lt_s
     (tee_local $3
      (i32.load offset=8396
       (i32.const 0)
      )
     )
     (i32.const 1)
    )
   )
   (set_local $4
    (i32.const 8204)
   )
   (set_local $2
    (i32.add
     (i32.mul
      (get_local $3)
      (i32.const 12)
     )
     (i32.const 8204)
    )
   )
   (loop $label$9
    (br_if $label$8
     (i32.eqz
      (tee_local $3
       (i32.load
        (i32.add
         (get_local $4)
         (i32.const 4)
        )
       )
      )
     )
    )
    (block $label$10
     (block $label$11
      (br_if $label$11
       (i32.gt_u
        (i32.add
         (get_local $3)
         (i32.const 4)
        )
        (get_local $1)
       )
      )
      (br_if $label$10
       (i32.gt_u
        (i32.add
         (get_local $3)
         (i32.load
          (get_local $4)
         )
        )
        (get_local $1)
       )
      )
     )
     (br_if $label$9
      (i32.lt_u
       (tee_local $4
        (i32.add
         (get_local $4)
         (i32.const 12)
        )
       )
       (get_local $2)
      )
     )
     (br $label$8)
    )
   )
   (i32.store
    (tee_local $4
     (i32.add
      (get_local $1)
      (i32.const -4)
     )
    )
    (i32.and
     (i32.load
      (get_local $4)
     )
     (i32.const 2147483647)
    )
   )
   (return
    (get_local $0)
   )
  )
  (get_local $0)
 )
)
