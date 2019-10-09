import React, {Fragment} from 'react';
import SchemaForm, {registerFormField, createFormActions, connect, Field, FormButtonGroup, Submit, Reset, FormCard, FormBlock, FormItemGrid, FormSlot, FormTextBox} from '@uform/next';
import "@alifd/next/dist/next.css";
import {Button} from "@alifd/next"


const UForm = () => (
  <Fragment>
    <SchemaForm
      onSubmit={values => console.log(values)}
      labelCol={7}
      wrapperCol={10}
    >
      <Field required type="string" title="string" name="name" />
      <FormButtonGroup offset={7}>
        <Submit />
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Fragment>
);

registerFormField('custom_component', connect()((props)=>{
  return <input value={props.value} onChange={e=>props.onChange(e.target.value)}/>
}))
const CustomInput = () =>{
  return <Fragment>
    <SchemaForm
      defaultValue={{aa:'123'}}
      onSubmit={values=>alert(JSON.stringify(values))}
    >
      <Field name="aa" type="custom_component"/>
      <Submit />
      {/* <button htmltype="submit">提交</button> */}
    </SchemaForm>
  </Fragment>
}

const ManyWidgets =()=>{
  return <Fragment>
    <SchemaForm
      labelCol={4}
      wrapperCol={20}
      onSubmit={values=>alert(JSON.stringify(values))}
    >
      <Field required type="string" title="string" name="name"  x-rules={[{"pattern": "\\d+", "message": "必须是数字"}]}/>
      <Field
        type="string"
        enum={[1,2,3,4]}
        required
        title="Radio"
        x-component="radio"
        name="radio"
      />
      <Field
        type="string"
        enum={[1,2,3,4]}
        required
        title="Select"
        name="select"
        x-props={{"multiple":true}}
      />
      <Field
        type="string"
        enum={[1,2,3,4]}
        required
        x-component="checkbox"
        title="Checkbox"
        name="checkbox"
      />
      <Field type="number" title="数字选择" name="number" />
      <Field type="boolean" title="开关选择" name="boolean"/>
      <Field type="date" title="日期选择" name="date"/>
      <Field type="daterange" title="日期范围" name="daterange"/>
      <Field type="year" title="年份" name="year"/>
      <Field type="week" title="周" name="week"/>
      <Field type="time" title="时间" name="time"/>

      <Field
        type="array"
        title="卡片上传文件"
        name="upload"
        x-component="upload"
        x-props={{listType: 'card'}}
      />
      <Field
        type="array"
        title="拖拽上传文件"
        name="upload2"
        x-component="upload"
        x-props={{listType: 'dragger'}}
      />
      <Field
        type="array"
        title="普通上传文件"
        name="upload3"
        x-component="upload"
        x-props={{listType: 'text'}}
      />
      <Field
        type="number"
        title="范围选择"
        name="range"
        x-component="range"
        x-props={{min:0, max:1024, marks:[0, 1024]}}
      />
      <Field type="array" x-component="transfer" title="穿梭框" name="transfer"/>
      <Field type="number" x-component="rating" title="等级" name="rating"/>

      <FormButtonGroup offset={7}>
        <Submit/>
        <Reset />
      </FormButtonGroup>
    </SchemaForm>
  </Fragment>
}


const actions = createFormActions()
// registerFormField(
//   'string',
//   connect()(props=><input {...props} value={props.value|''}/>)
// )
const ActionInput = ()=> {
  return <SchemaForm labelCol={4} wrapperCol={20} actions={actions} effects={($)=>{
    $('onFieldChange', 'aa').subscribe((fieldState)=>{
      actions.setFieldState('bb', state=>{
        state.value= fieldState.value
      })
    })
  }}>
    <Field type="string" name="aa" title="初始值"/>
    <Field type="string" name="bb" title="更改"/>
  </SchemaForm>
}

const FormButtonGroupExp = ()=>{
  return <SchemaForm>
    <FormButtonGroup offset={7} sticky align="center">
      <Button
        onClick={()=>{
          alert('自定义按钮')
        }}
      >
        上传文件
      </Button>
    </FormButtonGroup>
  </SchemaForm>
}

const FormCardExp = ()=>{
  return <SchemaForm>
    <FormCard title="基本信息">
      <Field name="aaa" type="string" title="字段1"/>
      <Field name="bbb" type="number" title="字段2"/>
      <Field name="ccc" type="date" title="字段3"/>
    </FormCard>
    <FormCard title="详细信息1">
      <Field name="ddd" type="number"/>
      <Field name="eee" type="date"/>
      <FormBlock title="区块">
        <Field name="fff" type="number" title="字段4"/>
        <Field name="ggg" type="date" title="字段5"/>
      </FormBlock>
    </FormCard>
    <FormCard title="详细信息2">
      <Field name="hhh" type="number"/>
      <Field name="iii" type="date"/>
      <FormItemGrid title="字段10" gutter={10} cols={[9, 15]}>
        <Field name="mmm" type="number" title="字段6"/>
        <Field name="nnn" type="date" title="字段7"/>
      </FormItemGrid>
    </FormCard>
  </SchemaForm>
}

const FormSlotExp =()=>{
  return <SchemaForm onSubmit={values=>alert(JSON.stringify(values))}>
    <Field type="string">
      <FormBlock title="基础信息">
        <FormSlot>
          <div>这是一段随意插入的内容</div>
        </FormSlot>
      </FormBlock>
    </Field>
    <Submit/>
  </SchemaForm>
}

const FormTextBoxExp =()=>{
  return <SchemaForm>
     <FormCard title="基本信息">
      <Field name="aaa" type="string" title="字段1"/>

      <FormTextBox title="字段12" gutter={10} text="数字 %s 日期 %s 数字 %s">
        <Field name="bbb12" type="number" title="字段2"/>
        <Field name="ccc12" type="date" title="字段3"/>
        <Field name="ddd12" type="date" title="字段4"/>
      </FormTextBox>
    </FormCard>
  </SchemaForm>
}

const FieldExp =()=>{
  return <SchemaForm>
    <Field type="string" title="Field举例" name="field1" description={<span>天黑了</span>}/>
  </SchemaForm>
}
export default function Dashboard() {
  return (
    <div>
      <UForm/>
      <CustomInput/>
      <ManyWidgets/>
      <ActionInput/>
      <FormButtonGroupExp/>
      <FormCardExp/>
      <FormSlotExp/>
      <FormTextBoxExp/>
      <FieldExp/>
    </div>
  );
}
