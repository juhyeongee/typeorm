import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


export enum Role{
    User = 'user',
    ADMIN = 'admin'
}

@Entity()
export class UserModel{

    // PCG => 자동으로 ID를 생성한다
    // Primary Column => 모든 테이블에서 기본적으로 존재해야한다. 
    // 테이블 안에서 각각의 Row를 구분할 수 있는 컬럼이다. 
    // @PrimaryColumn()
    // @PrimaryGeneratedColumn('uuid') -> 순서대로 위로 올라간다. 
    // 1, 2, 3, 4, 5 -> 9999
    // UUID 경우는 
    // 12341241234sdklfn1-12344kjnjkn-gkjrngekj2-dfkjn1324
    // 절대로 겹치지 않는 특별한 값을 준다
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        //데이터벵티스에서 인지하는 칼럼 타입 
        //자동으로 유추됨
        type: 'varchar',
        // 데이터베이스 칼럼 이름
        // 프로퍼티 이름으로 자동 유추됨
        name: 'title', 
        //값의 길이 
        // 입력할 수 있는 글자의 길이가 300이다. 
        length: 300, 
        //null이 가능한지 
        nullable: true,

        //true면 처음 저장할때만 값 지정 가능 
        //이후에는 값 변경 불가능,
        update: true, 

        //기본값잉 true, 
        //find(), findOne()등 관련함수 실행할 때, 기본으로 값을 불러올지 결정함
        select: false,

        //기본값
        // 아무것도 입력 안했을 때 기본으로 입력되는 값 
        default: 'default value',

        //칼럼중에서 유일무이한 값이 되어야하는지
        unique: false, 
    })
    title: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role : Role;
    
    //데이터가 생성되는 날짜와 시간이 자동으로 찍힌다 .
    @CreateDateColumn()
    createdAt: Date;

    // 데이터가 업데이트 되는 날짜와 시간이 자동으로 찍힌다. 
    @UpdateDateColumn()
    updatedAt: Date;

    // 데이터가 업데이트 될때마다 1씩 올라간다.
    // 처음 생성되면 값은 1이다. 
    // save() 함수가 몇 번 불렸는지 기억한다. 
    @VersionColumn()
    version: number;

    //
    // @Generated('increment')
    // => Primary는 아닌데 1씩 올라가는 경우임
    @Column()
    @Generated('uuid')
    additionalId: string;
}